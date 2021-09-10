import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';
import { List, Appbar } from 'react-native-paper';
import { API_KEY } from '@env';
import axios from 'axios';

export default function Home({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState(['Athens', 'London', 'Tokyo', 'Paris', 'Berlin']);

  const getCities = async () => {
    try {
      for (let city of cities) {
        const fetched = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        setData(data => [...data, fetched.data]);
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getCities();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <List.Section>
          <List.Subheader>Cities</List.Subheader>
          {
            data.map((data) => {
              return(
                  <List.Item style={{alignContent: 'center'}} key={data.city.name} title={`${data.city.name}, ${data.city.country}`} description={data.list[0].weather[0].main} 
                           left={() => <Image style={{height: 60, width: 60,}} source={{uri: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}}/>} 
                           right={() => <Text style={{fontWeight: '100', fontSize: 22, alignItems: 'center', alignSelf: 'center', color: 'rgba(0,0,0,0.6)'}}>{`${Math.round(data.list[0].main.temp - 273.15)}°C`}</Text>}
                           onPress={() => navigation.navigate('CityDetails', data)}
                />
              );
            })
          } 
        </List.Section>
      )}      
    </View>
  );
}

Home.navigationOptions = ({ navigation }) => {
  return {
    header: () => {
      return (
        <Appbar.Header>
        <Appbar.Action color="white" icon="thermometer"/>
        <Appbar.Content title="Weather Forecast"/>
        <Appbar.Action icon="plus" onPress={() => navigation.navigate('NewCity')} />
        </Appbar.Header>
      );
    }
  }
}

