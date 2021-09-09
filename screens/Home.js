import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';
import { List } from 'react-native-paper';
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
        console.log(fetched.data);
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
                <List.Item key={data.city.name} title={`${data.city.name}, ${data.city.country}`} description={data.list[0].weather[0].description} 
                           left={() => <img src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`} />} 
                           right={() => <Text>{`${Math.round(data.list[0].main.temp - 273.15)}°C`}</Text>}/>
              );
            })
          }
        </List.Section>
      )}      
    </View>
  );
}