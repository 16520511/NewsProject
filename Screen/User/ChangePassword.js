import React from 'react';
import { ToastAndroid, View, StyleSheet, } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import DefaultTheme from '../../theme'
import { connect } from '../../store'

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            isDarkMode: false,
            theme: DefaultTheme
        }
    }

    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    _handleChangePassword = async () => {
        if (this.state.newPassword != this.state.newPassword2)
            ToastAndroid.show('Mật khẩu mới không trùng khớp', ToastAndroid.SHORT);
        else
        {
            const email = await AsyncStorage.getItem("email");
            const token = await AsyncStorage.getItem("token");
            const { oldPassword, newPassword } = this.state;
            if (email != null && token != null)
                await axios.post('/user/update-password', {email, token, oldPassword, newPassword}).then(res => {
                    console.log(res);
                    if(res.status === 200) {
                        ToastAndroid.show('Đã đổi mật khẩu.', ToastAndroid.SHORT);
                    }
                    else
                        ToastAndroid.show('Không thành công.', ToastAndroid.SHORT);
                }).catch(err => ToastAndroid.show('Không thành công.', ToastAndroid.SHORT));
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title="Đổi mật khẩu" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <View style={{marginBottom: 30}}></View>
                <TextInput style={styles.input}
                    label='Mật khẩu cũ' mode='outlined' secureTextEntry={true}
                    value={this.state.oldPassword} onChangeText={text => this.setState({ oldPassword: text })}/>
                <TextInput style={styles.input}
                    label='Mật khẩu mới' mode='outlined' secureTextEntry={true}
                    value={this.state.newPassword} onChangeText={text => this.setState({ newPassword: text })}/>
                <TextInput style={styles.input}
                    label='Nhập lại mật khẩu mới' mode='outlined' secureTextEntry={true}
                    value={this.state.newPassword2} onChangeText={text => this.setState({ newPassword2: text })}/>
                <Button theme={this.state.theme} onPress={this._handleChangePassword} dark={true} style={styles.changePasswordBtn} icon="lock-reset" mode="contained">
                    Đổi mật khẩu
                </Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    input: { marginVertical: 8, marginHorizontal: 20, height: 55 },
    changePasswordBtn: { marginVertical: 15, marginHorizontal: 20, height: 55, justifyContent: 'center', borderWidth: 0, }
})

export default connect(ChangePassword)