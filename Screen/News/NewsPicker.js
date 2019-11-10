import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, } from 'react-native';
import { Avatar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class NewsPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSize: 80
        }
    }

    async componentDidMount() {
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

    static navigationOptions = {
        title: 'CHỌN BÁO',
    };

    calculateImageSize = (event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({ imageSize: width });
    }

    render() {
        return (
            <View style={styles.grid}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Category', {name: 'Huy'})} onLayout={this.calculateImageSize} style={styles.imageWrapper}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/vnexpress.jpg')} />
                        <Text style={styles.siteName}>VnExpress</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Category', {name: 'Huy'})}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/baomoi.jpg')} />
                        <Text style={styles.siteName}>Báo Mới</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Category', {name: 'Huy'})}>
                    <View>
                        <Avatar.Image size={this.state.imageSize} source={require('../../assets/images/afamily.jpg')} />
                        <Text style={styles.siteName}>AFamily</Text>
                    </View>
                </TouchableOpacity>
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


export default NewsPicker