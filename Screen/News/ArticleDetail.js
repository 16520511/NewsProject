import * as React from 'react';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors, Appbar, FAB, Text } from 'react-native-paper'
import { View, ScrollView } from 'react-native'
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import {Share as RNShare, Button} from 'react-native';
import {AirbnbRating, Rating} from 'react-native-ratings'
import axios from 'axios'

class ArticleDetail extends React.Component {
    state = {
        url: '',
        articleOrigin: '',
        isDarkMode: false,
        theme: DefaultTheme,
        displayRatings: 'none',
        rating: 0,
        ratingCount: 0
    }
    async componentDidMount() {
        await this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            const articleId = this.props.navigation.getParam("articleId");
            const articleOrigin = this.props.navigation.getParam("articleOrigin");
            await this.setState({
                articleOrigin: articleOrigin,
                url: 'https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId + '&type=' + (this.props.state.isDarkMode ? 'dark' : 'light')
            })
            await axios.get('/rating/get-by-news-id?token=' + token + '&newsId=' + articleId).then(async (res) => {
                if (res.status == 200) {
                    let ratingsSum = 0;
                    let allRatings = res.data.data;
                    for (let i = 0; i < allRatings.length; i++) {
                        ratingsSum += Number(allRatings[i].rate);
                    }

                    let rating = ratingsSum == 0 ? 0 : ratingsSum/allRatings.length

                    this.setState({rating, ratingCount: allRatings.length})
                }
            }).catch(async (err) => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("Login");
            });
            console.log('https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId);
        }
    }

    handleWebViewNavigationStateChange = newNavState => {
        const { url } = newNavState;
        if (url != this.state.url)
            this.WebView.stopLoading();
    }

    async componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode) {
            const token = await AsyncStorage.getItem("token");
            const articleId = this.props.navigation.getParam("articleId");
            await this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme,
                    url: 'https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId + '&type=' + (this.props.state.isDarkMode ? 'dark' : 'light')});
        }
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
            const result = await RNShare.share({message: 'Tôi đang đọc báo tại Điểm báo 24h', url: this.state.url});
      
            if (result.action === RNShare.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {}
            } else if (result.action === RNShare.dismissedAction) {}
          } catch (error) {
            alert(error.message);
        }
    }

    toogleRatings = () => {
        const displayRatings = this.state.displayRatings == 'none' ? 'flex' : 'none';
        this.setState({displayRatings})
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
                <ScrollView contentContainerStyle={{flexGrow: 1 }}>
                    <View style={{flex: 1}}>
                    <WebView source={{ uri: this.state.url }}
                        onNavigationStateChange={this.handleWebViewNavigationStateChange}
                        ref={c => {this.WebView = c;}} />
                    </View>
                    <View style={{ paddingVertical: 10, display: this.state.displayRatings,}}>
                        <Text style={{textAlign: 'center'}}>Đánh giá: {this.state.rating}/5 (Có {this.state.ratingCount} người đã đánh giá bài viết này)</Text>
                        <Rating ratingCount={5} startingValue={this.state.rating}
                        showRating={false} readonly={true} minValue={0} fractions={20}
                        starContainerStyle={{ paddingVertical: 10, display: this.state.displayRatings }}
                        />
                    </View>
                </ScrollView>
                <FAB style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'white'
                    }} small icon="star" color='red' onPress={this.toogleRatings}/>
            </View>

        );
    }
}

export default connect(ArticleDetail);