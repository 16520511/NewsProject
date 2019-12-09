import { DefaultTheme } from 'react-native-paper';

export const userLogIn = (store) => {
    const loggedIn = true;
    store.setState({ loggedIn });
};

export const userLogOut = (store) => {
    const loggedIn = false;
    store.setState({ loggedIn });
};

export const turnOnDarkMode = (store) => {
    const isDarkMode = true;
    const theme = {
        ...DefaultTheme,
        roundness: 30,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2e2e2e',
            accent: 'white',
            headerBarBg: '#2e2e2e',
            background: "#696868",
            text: 'white'
        },
    }
    store.setState({ isDarkMode, theme });
};

export const turnOffDarkMode = (store) => {
    const isDarkMode = false;
    const theme = {
        ...DefaultTheme,
        roundness: 30,
        colors: {
            ...DefaultTheme.colors,
            primary: '#dc143c',
            accent: '#f1c40f',
            headerBarBg: '#f7f7f7',
        },
    }
    store.setState({ isDarkMode, theme });
};