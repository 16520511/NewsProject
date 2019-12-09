import * as React from 'react';
import { Dimensions, View, Animated } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ArticleList from './ArticleList'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { ActivityIndicator, Colors, Appbar } from 'react-native-paper'
import DefaultTheme from '../../theme'
import { connect } from '../../store'
import { ScrollView } from 'react-native-gesture-handler';

class Category extends React.Component {
    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        const token = await AsyncStorage.getItem("token");
        if (token === null)
            this.props.navigation.navigate("Login");
        else {
            await axios.get('/category?token=' + token + '&websiteId=' + this.props.navigation.getParam('websiteId', '2')).then(async (res) => {
                if (res.status == 200) {
                    let routes = [];
                    let sceneMap = {};
                    console.log(res.data);
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        let cate = {key: data[i].id, title: data[i].name};
                        routes.push(cate);
                        sceneMap[data[i].id] = () => (<ArticleList websiteTitle={this.props.navigation.getParam('websiteTitle', 'VietNamNet')} goToArticleDetail={this.goToArticleDetail} categoryId = {data[i].id} websiteId={this.props.navigation.getParam('websiteId', '2')} />);
                    }
                    console.log(sceneMap);
                    console.log(routes);
                    this.setState({ routes: routes, sceneMap: sceneMap });
                }
            }).catch(async (err) => {
                await AsyncStorage.clear();
                this.props.navigation.navigate("Login");
            });
        }
        
    }
    state = {
        index: 0,
        routes: [
            {key: 'default', title: 'Default'}
        ],
        sceneMap: {default: () => (
            <View><ActivityIndicator style={{ marginTop: 50 }} animating={true} size='large' color={Colors.red800} /></View>
        )},
        isDarkMode: false,
        theme: DefaultTheme,
    };

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    goToArticleDetail = (websiteTitle, articleId) => {
        this.props.navigation.navigate("ArticleDetail", {websiteTitle, articleId});
    }

    renderTabBar = (props) => {
        return (
            <TabBar
            {...props} bounces={true}
            indicatorStyle={{ backgroundColor: 'white', }}  inactiveColor='white' scrollEnabled={true}
            style={{ backgroundColor: this.state.theme.colors.primary}} tabStyle={{ width: 100 }}/>
        )
    }


    render() {

        return (
        <ScrollView style={{flex: 1, backgroundColor: this.state.theme.colors.background}}>
            <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                <Appbar.Content
                    title={this.props.navigation.getParam('websiteTitle', 'VietNamNet')} dark={false} titleStyle={{ fontWeight: '100' }}/>
            </Appbar.Header>
            <TabView swipeEnabled={true}
                navigationState={this.state} renderTabBar={this.renderTabBar}
                renderScene={SceneMap(this.state.sceneMap)}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}/>
        </ScrollView>
        );
    }
}

export default connect(Category)