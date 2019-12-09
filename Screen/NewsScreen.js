import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import NewsPicker from './News/NewsPicker'
import Category from './News/Category'
import ArticleDetail from './News/ArticleDetail'

const NewsNavigator = createStackNavigator({
  NewsPicker: NewsPicker,
  Category: Category,
  ArticleDetail: ArticleDetail
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
        header: null,
        headerMode: 'none'
    }
});

export default createAppContainer(NewsNavigator);