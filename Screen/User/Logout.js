import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from "../../store"
import { ActivityIndicator, Colors } from 'react-native-paper';

class Logout extends React.Component {
    async UNSAFE_componentWillMount() {
        await AsyncStorage.clear();
        this.props.actions.userLogOut();
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size='large' animating={true} color={Colors.red800} />
            </View>
        );
    }
}

export default connect(Logout)