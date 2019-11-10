import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from '../store'

const EmptyPlaceholder = () => <Text>Empty</Text>;

class MainScreen extends React.Component {
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
                else if (res.status == 200) {
                    await AsyncStorage.setItem("email", res.data.email);
                    await AsyncStorage.setItem("name", res.data.name);
                }
            }).catch(err => console.log(err));
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.state);
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

    componentDidUpdate(prevProps) {
        if(!this.props.state.loggedIn)
            this.props.navigation.navigate("Login");
    }

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

export default connect(MainScreen)