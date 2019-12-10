import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Text, Divider, Appbar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'
import DefaultTheme from '../../theme'
import { connect } from '../../store'

class VideoList extends React.Component {
    state = {
        videos: [],
        isDarkMode: false,
        theme: DefaultTheme
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/video?token=').then(async (res) => {
                console.log(res.data.data);
                await this.setState({videos: res.data.data});
            }).catch(async (err) => {});
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }
    
    render() {
        const videos = this.state.videos.map(video => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Video', {filename: video.FileName, thumbnail: video.Avatar, videoTitle: video.Name})}
            style={{flex: 1, margin: 20}}>
                <Divider/>
                <View>
                    <Image style={{aspectRatio: 1.8, resizeMode: 'cover'}} source={{uri: video.Avatar}} />
                    <View>
                        <Text numberOfLines={2} style={{fontSize: 20, fontWeight: "bold", color: this.state.theme.colors.text}}>{video.Name}</Text>
                        <Text style={{color: this.state.theme.colors.text}}>Báo Dân Trí</Text>
                    </View>
                </View>
                <Divider/>
            </TouchableOpacity>
        ))

        const loader = this.state.videos.length == 0 ? <ActivityIndicator size='large' style={{ marginTop: 50 }} animating={true} color={Colors.red800} /> : null;
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.Content
                        title="VIDEO" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <ScrollView>
                    {loader}
                    {videos}
                </ScrollView>
            </View>
        );
    }
}

export default connect(VideoList);