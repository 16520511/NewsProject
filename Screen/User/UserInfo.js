import React from 'react';
import { View, Text } from 'react-native';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
        }
    }

    static navigationOptions = {
        title: 'Thông tin cá nhân',
    };

    render() {
        return (
            <View style={{paddingTop: 20}}>
                <Text>Email: {this.state.email}</Text>
                <Text>Tên: {this.state.name}</Text>
            </View>
        );
    }
}

export default UserInfo