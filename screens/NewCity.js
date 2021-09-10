import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper'
import { styles } from '../styles/styles';

export default function NewCity({navigation}) {
  const [text, setText] = React.useState('');

  const data = navigation.getParam('data');
  console.log(data);
  
  const getCity = async () => {
    try {
      for (let city of cities) {
        const fetched = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        setData(data => {[...data, fetched.data]; });
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.addCityContainer}>
      <TextInput 
        style={{backgroundColor: 'white'}}
        label="City"
        placeholder="e.g. New York" 
        value={text} 
        onChangeText={text => setText(text)}
      ></TextInput>
    </View>
  );
}