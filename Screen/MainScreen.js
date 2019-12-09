import * as React from 'react';
import { BottomNavigation, Text, DefaultTheme } from 'react-native-paper';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import UtilityScreen from './UtilityScreen'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from '../store'

const EmptyPlaceholder = () => <Text>Empty</Text>;

class MainScreen extends React.Component {
    async componentDidMount() {
        this.setState({theme: this.props.state.theme});
        const token = await AsyncStorage.getItem("token");
        const isDarkMode = await AsyncStorage.getItem("isDarkMode");

        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/user/info?token=' + token).then(async (res) => {
                if (res.status == 200) {
                    await AsyncStorage.setItem("email", res.data.email);
                    await AsyncStorage.setItem("name", res.data.name);
                }
            }).catch(async (err) => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("Login");
            });
        }
        if (isDarkMode == null) {
            await AsyncStorage.setItem("isDarkMode", "false");
        }

        else if(isDarkMode == "true") {
            this.props.actions.turnOnDarkMode();
            this.setState({isDarkMode: true});
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
        isDarkMode: false,
        theme: {
            ...DefaultTheme,
            roundness: 30,
            colors: {
                ...DefaultTheme.colors,
                primary: '#dc143c',
                accent: '#f1c40f',
            },
        }
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        news: NewsScreen,
        video: EmptyPlaceholder,
        utilities: UtilityScreen,
        account: UserScreen
    });

    componentDidUpdate(prevProps) {
        if(!this.props.state.loggedIn)
            this.props.navigation.navigate("Login");
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme})
    }

    render() {
        return (
        <BottomNavigation theme={this.state.theme}
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
        />
        );
    }
}

export default connect(MainScreen)