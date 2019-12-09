import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Appbar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import ArticleDetail from '../News/ArticleDetail'

class History extends React.Component {
    state = {
        articles: [],
        isDarkMode: false,
        theme: DefaultTheme
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/activity?token=' + token).then(async (res) => {
                if(res.status === 401) {
                    await AsyncStorage.clear();
                    this.props.navigation.navigate("Login");
                }
                
                else if (res.status == 200) {
                    this.setState({articles: res.data});
                    console.log(res.data);
                }
            }).catch(err => console.log(err));
        }
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    render() {
        const articles = this.state.articles.map(article => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ArticleDetail", {websiteTitle: "Tin đã đọc", articleId: article.news_id})}>
            <View style={styles.listItem}>
                <Text numberOfLines={2} style={{fontSize: 18, fontWeight: "bold", color: this.state.theme.colors.text}}>{article.title}</Text>
                <Text style={{color: this.state.theme.colors.text}}>Đã đọc: {article.created_at}</Text>
            </View>
            </TouchableOpacity>
        ))

        const loader = this.state.articles.length == 0 ? <ActivityIndicator size='large' style={{ marginTop: 50 }} animating={true} color={Colors.red800} /> : null;
        
        return (
            <View style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        title="Lịch sử đọc" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <ScrollView>
                {loader}
                {articles}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 5
    },
})

export default connect(History)