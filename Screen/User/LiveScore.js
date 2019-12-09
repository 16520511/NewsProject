import React from 'react';
import { View } from 'react-native'
import {  Appbar } from 'react-native-paper';
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import { WebView } from 'react-native-webview';

class LiveScore extends React.Component {
    state = {
        isDarkMode: false,
        theme: DefaultTheme
    }

    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title="Livescore" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <WebView source={{ uri: 'https://www.livescore.com' }} />
            </View>
        );
    }
}

export default connect(LiveScore)