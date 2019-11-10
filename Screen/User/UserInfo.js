import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
        }
    }

    async componentDidMount() {
        const name = await AsyncStorage.getItem("name");
        const email = await AsyncStorage.getItem("email");

        this.setState({name, email})
    }

    static navigationOptions = {
        title: 'Thông tin cá nhân',
    };

    render() {
        return (
            <View style={{padding: 20}}>
                <Text style={{ fontSize: 25 }}>Email: {this.state.email}</Text>
                <Text style={{ fontSize: 25 }}>Tên: {this.state.name}</Text>
            </View>
        );
    }
}

export default UserInfo