import * as React from 'react';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'
import { View } from 'react-native'

class ArticleDetail extends React.Component {
    state = {
        url: ''
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            const articleId = this.props.navigation.getParam("articleId");
            this.setState({
                url: 'https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId
            })
            console.log('https://peaceful-headland-66002.herokuapp.com/api/news/detail?token=' + token + '&id=' + articleId);
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {title: navigation.getParam('websiteTitle', 'VietNamNet'),}
    };

    handleWebViewNavigationStateChange = newNavState => {
        const { url } = newNavState;
        if (url != this.state.url)
            this.WebView.stopLoading();
    }

    render() {
        return (
            this.state.url === '' ? <View><ActivityIndicator style={{ marginTop: 50 }} animating={true} size='large' color={Colors.red800} /></View> :
            <WebView source={{ uri: this.state.url }}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            ref={c => {this.WebView = c;}} />
        );
    }
}

export default ArticleDetail;