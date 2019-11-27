import * as React from 'react';
import { ScrollView, Image, View, Text } from 'react-native';
import { DefaultTheme, Divider, IconButton, Appbar } from 'react-native-paper';
import axios from 'axios';
import { WebView } from 'react-native-webview'

class UtilityScreen extends React.Component {
    state = {
        currentCondition: '',
        currentConditionImage: '',
        currentTemp: '',
        currentHumidity: '',
        currentWindSpeed: '',
        currentPrecipitation: '',
        currentPressure: '',
        date: ''
    }
    async componentDidMount() {
        this.requestWeather('Sai Gon');
    }
    static navigationOptions = {
        title: 'TIỆN ÍCH',
    };

    requestWeather = (city) => {
        axios.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?format=json&lang=vi&key=2c857aa5b9de47eab02124811191611&q=' + city)
        .then(res => {
            console.log(res.data);
            let currentCondition = res.data.data.current_condition[0];
            console.log(currentCondition.weatherIconUrl[0].value);
            this.setState({currentCondition: currentCondition.lang_vi[0].value,
                currentConditionImage: currentCondition.weatherIconUrl[0].value,
                currentTemp: currentCondition.temp_C,
                currentHumidity: currentCondition.humidity,
                currentWindSpeed: currentCondition.windspeedKmph,
                currentPrecipitation: currentCondition.precipMM,
                currentPressure: currentCondition.pressure,
                date: res.data.data.weather[0].date}) ;    
        })
    }


    render() {
        const theme = {
            ...DefaultTheme,
            roundness: 2,
            colors: {
              ...DefaultTheme.colors,
              primary: '#f7f7f7',
              accent: '#f7f7f7',
            },
        };
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1 }}>
                <Appbar.Header theme={theme}>
                    <Appbar.Content
                        title="TIỆN ÍCH" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <View style={{flex: 1, margin: 10, marginTop: 30, padding: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', backgroundColor: 'white', borderRadius: 25}}>
                    
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{fontSize: 30, textAlignVertical: 'center', flex:5}}>Tp. Hồ Chí Minh</Text>
                        <IconButton style={{flex:1}}
                            icon="reload"
                            size={30}
                            onPress={() => this.requestWeather('Sai Gon')}/>
                    </View>
                    <Divider/>
                    <Divider/>
                    <Text style={{fontSize: 18, marginTop: 10, marginHorizontal: 10}}>Ngày { this.state.date }</Text>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, color: 'red', textAlignVertical: 'center', fontSize: 50, marginHorizontal: 10}}>{this.state.currentTemp}°C</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center', fontSize: 25, marginHorizontal: 10}}>{this.state.currentCondition} </Text>
                        <Image style={{width: 64, height: 64, backgroundColor: 'white'}} source={{uri: this.state.currentConditionImage}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Độ ẩm: {this.state.currentHumidity} %</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Sức gió: {this.state.currentWindSpeed} km/h</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Lượng mưa: {this.state.currentPrecipitation} mm</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Áp suất: {this.state.currentPressure} hPa</Text>
                    </View>
                </View>
                <WebView style={{height:620, margin: 10, marginTop: 30, padding: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', backgroundColor: 'white', borderRadius: 25}} source={{ uri: 'https://peaceful-headland-66002.herokuapp.com/api/ket-qua-xo-so' }} />
            </ScrollView>
        );
    }
}

export default UtilityScreen;