import React from 'react';
import { ToastAndroid, View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from "../store"

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }


    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if(token !== null) {
            this.props.actions.userLogIn();
            this.props.navigation.navigate('Main');
        }
    }

    _handleLogin = async () => {
        await axios.post('/login', this.state).then(async (res) => {
            console.log(res);
            if(res.status == 200) {
                await AsyncStorage.setItem('token', res.data.token);
                this.props.actions.userLogIn();
                this.props.navigation.navigate('Main');
            }
            else
                ToastAndroid.show('Email hoặc mật khẩu không đúng.', ToastAndroid.SHORT);
        }).catch(err => console.log(err));
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
                <View style={styles.loginForm}>
                    <TextInput style={styles.input}
                        label='Email' mode='outlined'
                        value={this.state.email} onChangeText={text => this.setState({ email: text })}/>
                    <TextInput style={styles.input}
                        label='Mật khẩu' mode='outlined' secureTextEntry={true}
                        value={this.state.password} onChangeText={text => this.setState({ password: text })}/>
                    <Button dark={true} style={styles.loginBtn} icon="login" mode="contained" onPress={this._handleLogin}>
                        Đăng nhập
                    </Button>
                </View>
                <View style={styles.toSignUp}>
                    <Text style={{color: 'white'}} onPress={() => this.props.navigation.navigate('Register')}>Chưa có tài khoản? Đăng ký tại đây</Text>
                </View>
            </ImageBackground>
        );
    }
}

var styles = StyleSheet.create({
    screen: { flex: 1, padding: 10, backgroundColor: '#40E0D0',},
    titleWrapper: { flex: 2, justifyContent: 'center', alignItems: 'center'},
    loginForm: { flex: 2, justifyContent: 'center' },
    toSignUp: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: { marginVertical: 8, marginHorizontal: 20, height: 55 },
    loginBtn: { marginVertical: 15, marginHorizontal: 20, height: 55, justifyContent: 'center', }
})


export default connect(LoginScreen);