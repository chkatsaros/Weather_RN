import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper'
import { styles } from '../styles/styles';

export default function NewCity({navigation}) {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        label="City"
        placeholder="e.g. New York" 
        value={text} 
        onChangeText={text => setText(text)}
      ></TextInput>
    </View>
  );
}