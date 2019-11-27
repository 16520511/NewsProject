import * as React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'

class App extends React.Component {
    state = {
        articles: []
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/news?token=' + token + '&websiteId=' + this.props.websiteId + '&categoryId=' + this.props.categoryId).then(async (res) => {
                if (res.status == 200) {
                    console.log(res.data);
                    this.setState({articles: res.data.data});
                }
            }).catch(async (err) => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("Login");
            });
        }
    }
    render() {
        const articles = this.state.articles.map(article => (
            <TouchableOpacity onPress={() => this.props.goToArticleDetail(this.props.websiteTitle, article.id)}>
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>{article.title}</Text>
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
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default App;