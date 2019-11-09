import React from 'react';
import { ToastAndroid, View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, Button, } from 'react-native-paper';
import axios from 'axios'

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
        }
    }

    _handleRegister = () => {
        if (this.state.password != this.state.password2)
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.SHORT);
        else {
            axios.post('/register', this.state).then(res => {
                if(res.status === 201) {
                    ToastAndroid.show('Đăng ký tài khoản thành công', ToastAndroid.SHORT);
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        password2: '',
                    })
                }
                else
                    ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
            }).catch(err => {
                console.log(err.response.data);
                ToastAndroid.show("Có lỗi xảy ra khi đăng ký tài khoản", ToastAndroid.SHORT);
            });
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/background.jpg')} style={styles.screen}>
                <View style={styles.titleWrapper}>
                    <Image
                    style={{resizeMode: 'contain'}}
                    source={require('../assets/images/logo.png')}
                    />
                </View>
                <View style={styles.registerForm}>
                    <TextInput style={styles.input}
                        label='Họ tên' mode='outlined'
                        value={this.state.name} onChangeText={text => this.setState({ name: text })}/>
                    <TextInput style={styles.input}
                        label='Email' mode='outlined'
                        value={this.state.email} onChangeText={text => this.setState({ email: text })}/>
                    <TextInput style={styles.input}
                        label='Mật khẩu' mode='outlined' secureTextEntry={true}
                        value={this.state.password} onChangeText={text => this.setState({ password: text })}/>
                    <TextInput style={styles.input}
                        label='Nhập lại mật khẩu' mode='outlined' secureTextEntry={true}
                        value={this.state.password2} onChangeText={text => this.setState({ password2: text })}/>
                    <Button onPress={this._handleRegister} dark={true} style={styles.registerBtn} icon="account-plus" mode="contained">
                        Đăng ký
                    </Button>
                </View>
                <View style={styles.toSignUp}>
                    <Text style={{color: 'white'}} onPress={() => this.props.navigation.navigate('Login')}>Đã có tài khoản? Đăng nhập tại đây</Text>
                </View>
            </ImageBackground>
        );
    }
}

var styles = StyleSheet.create({
    screen: { flex: 1, padding: 10, backgroundColor: '#008080' },
    titleWrapper: { flex: 2, justifyContent: 'center', alignItems: 'center'},
    registerForm: { flex: 3, justifyContent: 'center' },
    toSignUp: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
    input: { marginVertical: 8, marginHorizontal: 20, height: 55 },
    registerBtn: { marginVertical: 15, marginHorizontal: 20, height: 55, justifyContent: 'center',}
})

export default LoginScreen