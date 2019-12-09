import * as React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Dimensions  } from 'react-native';
import { Divider, IconButton, Appbar, Searchbar  } from 'react-native-paper';
import axios from 'axios';
import { connect } from '../store'
import DefaultTheme from '../theme'
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { Table, TableWrapper, Rows, Row } from 'react-native-table-component'

import * as rssParser from 'react-native-rss-parser';

class UtilityScreen extends React.Component {
    state = {
        currentCondition: '',
        currentConditionImage: '',
        currentTemp: '',
        currentHumidity: '',
        currentWindSpeed: '',
        currentPrecipitation: '',
        currentPressure: '',
        date: '',
        isDarkMode: false,
        theme: DefaultTheme,

        index: 0,
        routes: [
            { key: 'MN', title: 'Miền Nam' },
            { key: 'MB', title: 'Miền Bắc' },
        ],

        mienBac: [],
        mienNamHeader: [],
        mienNam: [],
        locationQuery: 'Sai Gon'
    }
    async componentDidMount() {
        this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
        this.requestWeather();

        await this.requestMienBac();
        await this.requestMienNam();
    }

    requestMienBac = async () => {
        const res = await axios.get('https://xosodaiphat.com/ket-qua-xo-so-mien-bac-xsmb.rss', {
            responseType: 'text'
          });
        try {
            const parsed = await rssParser.parse(res.data);

            let mienBac = []; 
            let parsedRes = parsed.items[0].description.trim().split(/\r\n|\n|\r/);
            parsedRes.map(item => mienBac.push(item.trim().split(': ')));
            
            this.setState({mienBac});

        } catch(err) {};
    }

    requestMienNam = async () => {
        const res = await axios.get('https://xosodaiphat.com/ket-qua-xo-so-mien-nam-xsmn.rss', {
            responseType: 'text'
          });
        try {
            const parsed = await rssParser.parse(res.data);
            let mienNam = [];
            let mienNamHeader = [''];
            let parsedRes = parsed.items[0].description.trim().split(/\r\n|\n|\r/);
            parsedRes.map(item => {
                item = item.trim();
                let split = item.split(': ');
                let header = split[0].split(']');
                let col1 = '';
                if(header.length > 1) {
                    mienNamHeader.push(header[0].slice(1))
                    col1 = header[1];
                }
                else col1 = header[0];
                let colAvailable = false;
                for(let i = 0; i < mienNam.length; i++)
                {
                    if(mienNam[i][0] == col1) {
                        mienNam[i].push(split[1]);
                        colAvailable = true;
                        break;
                    }
                }

                if(!colAvailable)
                    mienNam.push([col1, split[1]]);
            });
            console.log(mienNam)
            this.setState({mienNam, mienNamHeader});
        } catch(err) {};
    }

    requestWeather = () => {
        if (this.state.locationQuery == '')
            this.setState({locationQuery: 'Sai Gon'})
        axios.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?format=json&lang=vi&key=2c857aa5b9de47eab02124811191611&q=' + this.state.locationQuery)
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
        }).catch(err => this.setState({locationQuery: 'Sai Gon'}))
    }

    componentDidUpdate(prevProps) {
        if(this.props.state.isDarkMode != this.state.isDarkMode)
            this.setState({isDarkMode: this.props.state.isDarkMode, theme: this.props.state.theme});
    }

    renderTabBar = (props) => {
        return (
            <TabBar
            {...props} bounces={true}
            indicatorStyle={{ backgroundColor: 'white', }}  inactiveColor='white' scrollEnabled={true}
            style={{ backgroundColor: this.state.theme.colors.primary}} tabStyle={{ width: 190}}/>
        )
    }


    render() {
        const frameBackgroundColor = this.state.isDarkMode ? '#737373' : 'white';
        const textColor = this.state.theme.colors.text;

        const mienBac = () => (
            <ScrollView style={{ flex: 1, backgroundColor: frameBackgroundColor }}>
                <Table style={{flex: 1}} borderStyle={{borderWidth: 1}}>
                <TableWrapper style={styles.wrapper}>
                    <Rows data={this.state.mienBac} flexArr={[1, 3]} style={styles.row} 
                    textStyle={{ textAlign: 'center', fontSize: 18, color: this.state.theme.colors.text }}/>
                </TableWrapper>
                </Table>
            </ScrollView>
        );

        const mienNam = () => (
            <ScrollView style={{ flex: 1, paddingBottom: 30, backgroundColor: frameBackgroundColor }}>
                <Table borderStyle={{borderWidth: 1}}>
                <Row data={this.state.mienNamHeader} flexArr={[1, 2, 2, 2]} style={{height: 70}} 
                textStyle={{ textAlign: 'center', fontSize: 18, color: this.state.theme.colors.text, fontWeight: 'bold' }}/>
                <TableWrapper style={styles.wrapper}>
                    <Rows data={this.state.mienNam} flexArr={[1, 2, 2, 2]} style={{height: 70}}
                    textStyle={{ textAlign: 'center', fontSize: 18, color: this.state.theme.colors.text }}/>
                </TableWrapper>
                </Table>
            </ScrollView>
        );

        return (
            <View style={{flex: 1}}>
                <Appbar.Header style={{backgroundColor: this.state.theme.colors.headerBarBg}}>
                    <Appbar.Content
                        title="TIỆN ÍCH" dark={false} titleStyle={{ fontWeight: '100' }}
                    />
                </Appbar.Header>
                <ScrollView contentContainerStyle={{flexGrow: 1 }}>
                <Searchbar style={{flex: 1, marginHorizontal: 10, marginTop: 20}}
                    placeholder="Tìm thành phố"
                    onChangeText={locationQuery => this.setState({ locationQuery })}
                    onSubmitEditing={this.requestWeather}
                    onIconPress={this.requestWeather}
                    value={this.state.locationQuery}/>
                <View style={{flex: 1, elevation: 4, margin: 10, marginVertical: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', backgroundColor: frameBackgroundColor, borderRadius: 25}}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{color: textColor, margin: 10, fontSize: 30, textAlignVertical: 'center', flex:5}}>{this.state.locationQuery}</Text>
                        <IconButton style={{flex:1}}
                            icon="reload" color={textColor}
                            size={30}
                            onPress={() => this.requestWeather('Sai Gon')}/>
                    </View>
                    <Divider/>
                    <Divider/>
                    <Text style={{color: textColor, fontSize: 18, marginTop: 10, marginHorizontal: 10}}>Ngày { this.state.date }</Text>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, color: textColor, color: '#ed2445', textAlignVertical: 'center', fontSize: 50, marginHorizontal: 10}}>{this.state.currentTemp}°C</Text>
                        <Text style={{flex: 1, color: textColor, textAlignVertical: 'center', fontSize: 25, marginHorizontal: 10}}>{this.state.currentCondition} </Text>
                        <Image style={{width: 64, height: 64, backgroundColor: 'white'}} source={{uri: this.state.currentConditionImage}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, color: textColor, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Độ ẩm: {this.state.currentHumidity} %</Text>
                        <Text style={{flex: 1, color: textColor, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Sức gió: {this.state.currentWindSpeed} km/h</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
                        <Text style={{flex: 1, color: textColor, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Lượng mưa: {this.state.currentPrecipitation} mm</Text>
                        <Text style={{flex: 1, color: textColor, textAlignVertical: 'center', fontSize: 18, marginHorizontal: 10}}>Áp suất: {this.state.currentPressure} hPa</Text>
                    </View>
                </View>
                {/* <WebView style={{height:750, margin: 10, marginTop: 30, padding: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', backgroundColor: 'white', borderRadius: 25}} source={{ uri: 'https://peaceful-headland-66002.herokuapp.com/api/ket-qua-xo-so' }} /> */}
              
                    <TabView style={{flex: 1, marginHorizontal: 10,}}
                        navigationState={this.state}
                        renderScene={SceneMap({
                            MB: mienBac,
                            MN: mienNam
                        })}
                        renderTabBar = {this.renderTabBar}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 60  },
});

export default connect(UtilityScreen);