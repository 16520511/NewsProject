import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as React from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import ChangePassword from './User/ChangePassword'
import UserInfo from './User/UserInfo'
import Logout from './User/Logout'
import LiveScore from './User/LiveScore'
import History from './User/History'
import { connect } from '../store'
import AsyncStorage from '@react-native-community/async-storage'
import DefaultTheme from '../theme'
import ArticleDetail from './News/ArticleDetail'

class UserScreen extends React.Component {
    state = {
        isDarkMode: false,
        theme: DefaultTheme
    };

    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.theme != this.state.theme)
            this.setState({theme: this.props.state.theme});
    }

    _handleLogout = () => {
        this.props.navigation.navigate("Logout");
    }

    turnOnDarkMode = async () => {
        const isDarkMode = this.state.isDarkMode;
        await this.setState({isDarkMode: !isDarkMode});
        if (this.state.isDarkMode) {
            this.props.actions.turnOnDarkMode();
            await AsyncStorage.setItem("isDarkMode", "true");
        }
        else {
            this.props.actions.turnOffDarkMode();
            await AsyncStorage.setItem("isDarkMode", "false");
        }
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.Content
                        title="CÁ NHÂN" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <ScrollView style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <List.Section>
                    <List.Subheader theme={this.state.theme}>CÁ NHÂN</List.Subheader>
                    <List.Item theme={this.state.theme} theme={this.state.theme} onPress={() => this.props.navigation.navigate("UserInfo")}
                    title="Thông tin tài khoản" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="account-box" />}/>
                    <List.Item theme={this.state.theme} onPress={() => this.props.navigation.navigate("ChangePassword")}
                    title="Đổi mật khẩu" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="lock" />}/>
                    <List.Item theme={this.state.theme}
                    title="Tin đã đánh dấu" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="bookmark" />}/>
                    <List.Item theme={this.state.theme} onPress={() => this.props.navigation.navigate("History")}
                    title="Tin đọc gần đây" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="clock" />}/>
                    <List.Item theme={this.state.theme}
                    title="Night Mode" right={props => <Switch trackColor={{true: 'white', false: 'grey'}}
                         value={this.state.isDarkMode}
                        onValueChange={this.turnOnDarkMode}/>}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="theme-light-dark" />}/>
                    <List.Item theme={this.state.theme} onPress={this._handleLogout}
                    title="Đăng xuất"
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="logout" />}/>
                </List.Section>
                <List.Section>
                    <List.Subheader theme={this.state.theme}>ỨNG DỤNG</List.Subheader>
                    <List.Item theme={this.state.theme} title="Livescore" onPress={() => this.props.navigation.navigate("LiveScore")}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color={this.state.theme.colors.text} icon="soccer" />}/>
                    <List.Item theme={this.state.theme} title="Điều khoản sử dụng" left={() => <List.Icon color={this.state.theme.colors.text} icon="clipboard-check" />}/>
                    <List.Item theme={this.state.theme} title="Đánh giá ứng dụng" left={() => <List.Icon color={this.state.theme.colors.text} icon="star" />}/>
                    <List.Item theme={this.state.theme} title="Góp ý" left={() => <List.Icon color={this.state.theme.colors.text} icon="email" />}/>
                </List.Section>
            </ScrollView>
            </View>
        );
    }
}

const UserNavigator = createStackNavigator({
  UserScreen: connect(UserScreen),
  ChangePassword: ChangePassword,
  UserInfo: UserInfo,
  Logout: Logout,
  LiveScore: LiveScore,
  History: History,
  ArticleDetail: ArticleDetail
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
        header: null,
        headerMode: 'none'
    }
});

export default createAppContainer(UserNavigator);