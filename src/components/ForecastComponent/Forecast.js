import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import {ICON_URL} from '@env'
const Forecast = ({title, data}) => {
  return (
    <View>
      <Text style={styles.lbl}>{title}</Text>

      <ScrollView
      horizontal
      > 
      {data.map((item, index) => {
        return (
            <View style={styles.container}  key={index}>
                <Text>{item.title}</Text>
                <Image style={{height:50, width:50}} source={{uri : `${ICON_URL}${item.icon}@2x.png`}} />
                <Text>{`${item.temp.toFixed()}°`}</Text>
            </View>
        )
      })}

      </ScrollView>
    </View>
  )
}

export default Forecast

const styles = StyleSheet.create({
  container:{
    marginHorizontal:5,
    padding:10,
    alignItems:'center',
    borderWidth:1,
    borderRadius:5
  },
  lbl:{
    fontSize:16,
    fontWeight:'bold',
    marginVertical:10
  }
})