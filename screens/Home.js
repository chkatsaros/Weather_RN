import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Details Screen</Text>
      <Button title='to city details screen' onPress={() => navigation.navigate('CityDetails')} />
      <Text style={styles.titleText}>New Screen</Text>
      <Button title='to new city screen' onPress={() => navigation.navigate('NewCity')} />
    </View>
  );
}