import * as React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ArticleList from './ArticleList'


export default class Category extends React.Component {
    componentDidMount() {
        console.log(this.props.navigation);
    }
    state = {
        index: 0,
        routes: [
            { key: 'fourth', title: 'Thể thao'},
            { key: 'first', title: 'Thời sự' },
            { key: 'second', title: 'Xã hội' },
            { key: 'third', title: 'Kinh tế'},
        ],
    };

    static navigationOptions = {
        title: 'VnExpress',
    };

    renderTabBar = (props) => {
        return (
            <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white', }}  inactiveColor='white' scrollEnabled={true}
            style={{ backgroundColor: '#dc143c'}} tabStyle={{ width: 100 }}/>
        )
    }

    render() {
        const FirstRoute = () => (
            <ArticleList />
        );
        
        const SecondRoute = () => (
            <ArticleList />
        );

        const ThirdRoute = () => (
            <ArticleList />
        );

        const FourthRoute = () => (
            <ArticleList />
        );
        return (
        <TabView
            navigationState={this.state} renderTabBar={this.renderTabBar}
            renderScene={SceneMap({
                fourth: FourthRoute,
                first: FirstRoute,
                second: SecondRoute,
                third: ThirdRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}/>
        );
    }
}