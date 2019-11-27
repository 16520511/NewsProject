import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Divider, Text } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper'

class History extends React.Component {
    static navigationOptions = {
        title: 'Lịch sử',
    };

    state = {
        articles: []
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
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
                }
            }).catch(err => console.log(err));
        }
    }

    render() {
        const articles = this.state.articles.map(article => (
            <View style={styles.listItem}>
                <Text numberOfLines={2} style={styles.title}>{article.title}</Text>
                <Text>Đã đọc: {article.created_at}</Text>
            </View>
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
    listItem: {
        margin: 10,
        padding: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default History