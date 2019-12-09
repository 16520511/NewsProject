import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import {Appbar} from 'react-native-paper'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            isDarkMode: false,
            theme: DefaultTheme
        }
    }

    async componentDidMount() {
        const name = await AsyncStorage.getItem("name");
        const email = await AsyncStorage.getItem("email");

        this.setState({name, email, isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme})
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title="Thông tin cá nhân" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <Text style={{ fontSize: 25, marginTop: 20, marginHorizontal: 20, color: this.state.theme.colors.text }}>Email: {this.state.email}</Text>
                <Text style={{ fontSize: 25, marginHorizontal: 20, color: this.state.theme.colors.text }}>Tên: {this.state.name}</Text>
            </View>
        );
    }
}

export default connect(UserInfo)