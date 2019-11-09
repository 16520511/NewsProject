import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './Screen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen'
import MainScreen from './Screen/MainScreen'
import axios from 'axios'

axios.defaults.baseURL = 'http://mobileluat.southeastasia.cloudapp.azure.com:8080/mobile/public/api';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Main: MainScreen
}, {
    defaultNavigationOptions: {
        header: null,
        headerShown: false
    }
});

export default createAppContainer(AppNavigator);