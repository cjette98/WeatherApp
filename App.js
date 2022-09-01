import { StyleSheet, Text, View , Platform, StatusBar} from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import { getWeatherData } from './src/services/weatherService';
import Forecast from './src/components/ForecastComponent/Forecast';
const App = () => {
  
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [errMsg, setErrorMsg] = useState('');

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentlocation = await Location.getCurrentPositionAsync({});
     
      const loc = currentlocation.coords;
      const query = {lat:loc.latitude, lon:loc.longitude}

      await getWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      console.log(JSON.stringify(data))
      });      
    
    })();
  }, []);

 
  
if (errMsg !== '') {
  return (
    <View style={styles.deniedLocation}>
        <Text>{errMsg}</Text>
    </View>
  )
}
  return (
    <View style={styles.appContainer}>
      
      {weather && (
        <View>
          <View>
            <Text style={styles.Location}>{weather.name}, {weather.sys.country}</Text>
            <Text style={styles.temperature}>{weather.main.temp}°</Text>
          </View>
            <Forecast title={'Hourly Forecast'} data={weather.hourly} />
            <Forecast title={'Daily Forecast'} data={weather.daily} />
          </View>
      )}
      
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer:{
    padding:10,
    flex:1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
  Location:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  temperature:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center'
  },
  deniedLocation:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

})