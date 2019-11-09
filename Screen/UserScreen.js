import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import ChangePassword from './User/ChangePassword'
import AsyncStorage from '@react-native-community/async-storage';

class UserScreen extends React.Component {

    static navigationOptions = {
        title: 'CÁ NHÂN',
    };

    _handleLogout = async () => {
        // await AsyncStorage.clear();
        console.log(this.props);
    }

    render() {
        return (
            <ScrollView>
                <List.Section>
                    <List.Subheader>CÁ NHÂN</List.Subheader>
                    <List.Item
                    title="Thông tin tài khoản" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color="#000" icon="account-box" />}/>
                    <List.Item onPress={() => this.props.navigation.navigate("ChangePassword")}
                    title="Đổi mật khẩu" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color="#000" icon="lock" />}/>
                    <List.Item
                    title="Tin đã đánh dấu" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color="#000" icon="bookmark" />}/>
                    <List.Item
                    title="Tin đọc gần đây" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color="#000" icon="clock" />}/>
                    <List.Item onPress={this._handleLogout}
                    title="Đăng xuất" right={props => <List.Icon {...props} icon="chevron-right" />}
                    left={() => <List.Icon color="#000" icon="logout" />}/>
                </List.Section>
                <List.Section>
                    <List.Subheader>ỨNG DỤNG</List.Subheader>
                    <List.Item title="Điều khoản sử dụng" left={() => <List.Icon color="#000" icon="clipboard-check" />}/>
                    <List.Item title="Đánh giá ứng dụng" left={() => <List.Icon color="#000" icon="star" />}/>
                    <List.Item title="Góp ý" left={() => <List.Icon color="#000" icon="email" />}/>
                </List.Section>
            </ScrollView>
        );
    }
}

const UserNavigator = createStackNavigator({
  UserScreen: UserScreen,
  ChangePassword: ChangePassword
}, {
    defaultNavigationOptions: {
        // headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
    }
});

export default createAppContainer(UserNavigator);