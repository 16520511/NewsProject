import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Divider, Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

class App extends React.Component {

    render() {
        return (
            <ScrollView>
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>Mourinho: 'Nhiều HLV dùng kiểm soát bóng để quảng bá hình ảnh'</Text>
                        <Text>20 phút trước</Text>
                    </View>
                    <Avatar.Image size={80} source={require('../../assets/images/sport-05.jpg')} />
                </View>
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>Ramsey xin lỗi vì 'cướp' bàn thắng của Ronaldo</Text>
                        <Text>20 phút trước</Text>
                    </View>
                    <Avatar.Image size={80} source={require('../../assets/images/sport-04.jpg')} />
                </View>
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>HLV Park tránh nói về cửa đi tiếp ở vòng loại World Cup 2022</Text>
                        <Text>20 phút trước</Text>
                    </View>
                    <Avatar.Image size={80} source={require('../../assets/images/sport-01.jpg')} />
                </View>
                <Divider />
                <Divider />
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>Ông Nguyễn Văn Vinh: 'Ông Park đã nâng tầm tư duy cầu thủ Việt Nam'</Text>
                        <Text>1 tiếng trước</Text>
                    </View>
                    <Avatar.Image size={80} source={require('../../assets/images/sport-02.jpg')} />
                </View>
                <Divider />
                <Divider />
                <View style={styles.itemList}>
                    <View style={styles.rightStyle}>
                        <Text numberOfLines={2} style={styles.title}>Văn Hậu hé lộ lý do đến Hà Lan chơi bóng</Text>
                        <Text>2 tiếng trước</Text>
                    </View>
                    <Avatar.Image size={80} source={require('../../assets/images/sport-03.jpg')} />
                </View>
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