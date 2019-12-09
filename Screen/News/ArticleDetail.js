import * as React from 'react';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors, Appbar } from 'react-native-paper'
import { View } from 'react-native'
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import { ShareDialog } from 'react-native-fbsdk';
import Share from 'react-native-share';
import {Share as RNShare, Button} from 'react-native';

class ArticleDetail extends React.Component {
    state = {
        url: '',
        isDarkMode: false,
        theme: DefaultTheme
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            const articleId = this.props.navigation.getParam("articleId");
            this.setState({
                url: 'https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId
            })
            console.log('https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId);
        }
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    handleWebViewNavigationStateChange = newNavState => {
        const { url } = newNavState;
        if (url != this.state.url)
            this.WebView.stopLoading();
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    async shareLinkWithShareDialog() {
        // const shareLinkContent = {
        //     contentType: 'link',
        //     contentUrl: this.state.url,
        //     contentDescription: 'Facebook SDK Test!'
        // }

        // ShareDialog.canShow(shareLinkContent).then(
        //     function(canShow) {
        //         if (canShow) {
        //             return ShareDialog.show(shareLinkContent);
        //         }
        //     }
        // ).then(function(result) {
        //     if (!result.isCancelled)
        //         alert('Đã chia sẻ bài viết trên Facebook');
        // },
        // function(error) {
        //     alert('Có lỗi xảy ra');
        // });

        // const shareOptions = {
        //     title: 'Share via',
        //     message: 'some message',
        //     url: this.state.url,
        // };
        // Share.open(shareOptions)
        // .then((res) => { console.log(res) })
        // .catch((err) => { err && console.log(err); });

        try {
            const result = await RNShare.share({
              message:
                'Điểm báo 24h',
            });
      
            if (result.action === RNShare.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === RNShare.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            this.state.url === '' ? <View>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title={this.props.navigation.getParam('websiteTitle', 'VietNamNet')} dark={false} titleStyle={{ fontWeight: '100' }}/>
                </Appbar.Header>
                <ActivityIndicator style={{ marginTop: 50 }} animating={true} size='large' color={Colors.red800} />
            </View> :
            <View style={{flex: 1}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title={this.props.navigation.getParam('websiteTitle', 'VietNamNet')} dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                    <Appbar.Action icon="share" onPress={() => this.shareLinkWithShareDialog()} />
                    <Appbar.Action icon="bookmark" />
                </Appbar.Header>
                <WebView source={{ uri: this.state.url }}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
                ref={c => {this.WebView = c;}} />
            </View>

        );
    }
}

export default connect(ArticleDetail);