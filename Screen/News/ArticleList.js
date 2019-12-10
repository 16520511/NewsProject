import * as React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'
import DefaultTheme from '../../theme'
import { connect } from '../../store'

class ArticleList extends React.Component {
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
            await axios.get('/news?token=' + token + '&websiteId=' + this.props.websiteId + '&categoryId=' + this.props.categoryId).then(async (res) => {
                if (res.status == 200) {
                    this.setState({articles: res.data.data});
                }
            }).catch(async (err) => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("Login");
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    render() {
        const articles = this.state.articles.map(article => (
            <TouchableOpacity onPress={() => this.props.goToArticleDetail(this.props.websiteTitle, article.id, article.url)}>
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={{fontSize: 20, fontWeight: "bold", color: this.state.theme.colors.text}}>{article.title}</Text>
                    </View>
                    <Avatar.Image size={80} source={{uri: article.image}} />
                </View>
            </TouchableOpacity>
        ))

        const loader = this.state.articles.length == 0 ? <ActivityIndicator size='large' style={{ marginTop: 50 }} animating={true} color={Colors.red800} /> : null;
        return (
            <ScrollView>
                {loader}
                {articles}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemList: {flexDirection: 'row', margin: 10},
    rightStyle: {
        flex: 6
    },
})

export default connect(ArticleList);