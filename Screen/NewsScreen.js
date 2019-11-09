import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import NewsPicker from './News/NewsPicker'
import Category from './News/Category'

const NewsNavigator = createStackNavigator({
  NewsPicker: NewsPicker,
  Category: Category
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
    }
});

export default createAppContainer(NewsNavigator);