import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function ReviewDetails({ navigation }) {

  const pressHandler = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>ReviewDetails Screen</Text>
      <Button title='back to home screen' onPress={pressHandler} />
    </View>
  );
}