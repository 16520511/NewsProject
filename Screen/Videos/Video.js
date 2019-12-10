import React from 'react';
import { View, Text } from 'react-native'
import {  Appbar } from 'react-native-paper';
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import VideoPlayer from 'react-native-video-player'
import {Share as RNShare, Button} from 'react-native';

class MyVideo extends React.Component {
    state = {
        isDarkMode: false,
        theme: DefaultTheme,
        filename: '',
        thumbnail: ''
    }

    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme, 
            filename: this.props.navigation.getParam('filename'),
            thumbnail: this.props.navigation.getParam('thumbnail'),
            videoTitle: this.props.navigation.getParam('videoTitle')});
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
            const result = await RNShare.share({message: 'Xem video tại Điểm báo 24h', url: this.state.filename});
      
            if (result.action === RNShare.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {}
            } else if (result.action === RNShare.dismissedAction) {}
          } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title="Video" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                    <Appbar.Action icon="share" onPress={() => this.shareLinkWithShareDialog()} />
                </Appbar.Header>
                <View style={{flex:1, padding: 20, backgroundColor: this.state.theme.colors.background}}>
                    <Text style={{fontSize: 25, marginBottom: 30, fontWeight: "bold", color: this.state.theme.colors.text}}>{this.state.videoTitle}</Text>
                    <VideoPlayer video={{uri: this.state.filename}}
                        ref={(ref) => {this.player = ref}}
                        bufferConfig={{
                            minBufferMs: 7000,
                            maxBufferMs: 15000,
                            bufferForPlaybackMs: 4000,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }} thumbnail={{uri: this.state.thumbnail}}
                        controls={true} resizeMode='contain'
                    />
                    <Text style={{marginTop: 15, color: this.state.theme.colors.text}}>Nguồn: Báo Dân Trí</Text>
                </View>
            </View>
        );
    }
}

export default connect(MyVideo)