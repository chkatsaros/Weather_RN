import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/styles';
import { Title, Caption, List, Colors } from 'react-native-paper';

export default function CityDetails({ navigation }) {

  const time = new Date(0);
  time.setUTCSeconds(navigation.getParam('list')[0].dt);

  return (
    <View style={styles.container}>
      <View style={{padding: 10}}> 
        <Title style={{fontSize: 24, flexDirection: 'row'}}>{`${navigation.getParam('city').name}, ${navigation.getParam('city').country}`}</Title>
        <Caption style={{fontSize: 'normal', flexDirection: 'row'}}>{`${time.toLocaleString('en-us', { weekday: 'short' })}, ${time.toLocaleString('en-US', { hour: '2-digit', minute:'2-digit', hour12: true })}, ${navigation.getParam('list')[0].weather[0].main}`}</Caption>
      </View>
      <View style={{padding: 10, flexDirection: 'row', alignItems:'center', justifyContent: 'left'}}>
        <Caption style={{fontSize: 70, fontWeight: '100', width: '50%'}}>{`${Math.round(navigation.getParam('list')[0].main.temp - 273.15)}°C`}</Caption>
        <View style={{flexDirection: 'row', width: '50%', justifyContent: 'left'}}>
          <Image style={{height: 120, width: 120,}} source={{uri: `http://openweathermap.org/img/wn/${navigation.getParam('list')[0].weather[0].icon}@4x.png`}}/>
        </View>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '50%',flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
          <List.Icon color={Colors.grey600} icon="send" />
          <Caption style={{justifyContent: 'left', alignContent: 'center', fontSize: 'normal'}}>{`${Math.round(navigation.getParam('list')[0].wind.speed * 3.6)} km/h`}</Caption>
        </View>
        <View style={{width: '50%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
          <List.Icon color={Colors.grey600} icon="water-percent" />
          <Caption style={{justifyContent: 'left', alignContent: 'center', fontSize: 'normal'}}>{`${navigation.getParam('list')[0].main.humidity}%`}</Caption>
        </View>
      </View>
        { 
          navigation.getParam('list').map((data,i) => {
            const time = new Date(0);
            time.setUTCSeconds(navigation.getParam('list')[i].dt);
            if (i >= 8 && i%8 === 0) {
              return(
                <List.Item key={time.toLocaleString('en-us', {weekday: 'long'})} title={time.toLocaleString('en-us', {weekday: 'long'})}  
                           right={() => 
                                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'left'}}>
                                      <Caption style={{justifyContent: 'left', alignContent: 'center', fontSize: 'normal'}}>{`${data.weather[0].main}, ${Math.round(data.main.temp - 273.15)}°C`}</Caption>
                                      <Image style={{justifyContent: 'center', alignItems: 'center', height: 50, width: 50,}} source={{uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}}/>
                                  </View>
                                 }
                          //  onPress={() => navigation.navigate('CityDetails', data)}
                          />
              );
            }
          })
        }
    </View>
  );
}