import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, } from 'react-native';
import { Avatar, Appbar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import DefaultTheme from '../../theme'
import { connect } from '../../store'

class NewsPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSize: 80,
            isDarkMode: false,
            theme: DefaultTheme
        }
    }

    async componentDidMount() {
        await this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        const token = await AsyncStorage.getItem('token');
        if (token === null)
            this.props.navigation.navigate('Login');
        else
            await axios.get('/user/info?token=' + token).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response.data);
            }); 
    }

    calculateImageSize = (event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({ imageSize: width });
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.Content
                        title="CHỌN BÁO" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <View style={styles.grid}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Category', {websiteId: '2', websiteTitle: 'VietNamNet'})} onLayout={this.calculateImageSize} style={styles.imageWrapper}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/vietnamnet.png')} />
                        <Text style={{color: this.state.theme.colors.text, fontSize: 20, textAlign: 'center'}}>VietNamNet</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Category', {name: 'Huy'})}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/baomoi.jpg')} />
                        <Text style={{color: this.state.theme.colors.text, fontSize: 20, textAlign: 'center'}}>Báo Mới</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Category', {name: 'Huy'})}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/afamily.jpg')} />
                        <Text style={{color: this.state.theme.colors.text, fontSize: 20, textAlign: 'center'}}>AFamily</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    grid: {
        flexDirection: 'row'
    },
    imageWrapper: {
        flex: 1/3,
        margin: 10,
    },
    siteName: { fontSize: 20, textAlign: 'center' }
})


export default connect(NewsPicker)