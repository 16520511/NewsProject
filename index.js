/**
 * @format
 */
import * as React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import store from './store'
const theme = {
    ...DefaultTheme,
    roundness: 30,
    colors: {
        ...DefaultTheme.colors,
        primary: '#dc143c',
        accent: '#f1c40f',
    },
};

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
