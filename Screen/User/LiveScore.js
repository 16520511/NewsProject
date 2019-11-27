import React from 'react';
import { WebView } from 'react-native-webview';

class LiveScore extends React.Component {
    static navigationOptions = {
        title: 'Livescore',
    };

    render() {
        return (
            <WebView source={{ uri: 'https://www.livescore.com' }} />
        );
    }
}

export default LiveScore