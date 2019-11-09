import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const EmptyPlaceholder = () => <Text>Empty</Text>;

export default class MainScreen extends React.Component {
    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/user/info?token=' + token).then(async (res) => {
                console.log(res);
                if(res.status === 401) {
                    await AsyncStorage.clear();
                    this.props.navigation.navigate("Login");
                }
                else if (res.status == 200)
                    await AsyncStorage.setItem("email", res.data.email);
            }).catch(err => console.log(err));
        }
    }

    state = {
        index: 0,
        routes: [
            { key: 'news', title: 'Tin tức', icon: 'newspaper' },
            { key: 'video', title: 'Video', icon: 'video' },
            { key: 'utilities', title: 'Tiện ích', icon: 'cloud' },
            { key: 'account', title: 'Cá nhân', icon: 'account' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        news: NewsScreen,
        video: EmptyPlaceholder,
        utilities: EmptyPlaceholder,
        account: UserScreen
    });

    render() {
        return (
        <BottomNavigation
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
        />
        );
    }
}
