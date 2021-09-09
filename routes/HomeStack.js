import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import Home from '../screens/Home';
import CityDetails from '../screens/CityDetails';
import NewCity from '../screens/NewCity';
import { Appbar } from 'react-native-paper';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
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
  },
  CityDetails: {
    screen: CityDetails,
    navigationOptions: ({navigation}) => {
      return {
        header: () => {
          return (
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title="5 day forecast"/>
            <Appbar.Action icon="delete" 
              onPress={ () => {
                  // delete stuff
                  navigation.navigate('Home');
                }
              } />
            </Appbar.Header>
          );
        }
      }
    }
  },
  NewCity: {
    screen: NewCity,
    navigationOptions: ({navigation}) => {
      return {
        header: () => {
          return (
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title="Add new city"/>
            <Appbar.Action icon="check" onPress={() => navigation.navigate('NewCity')} />
            </Appbar.Header>
          );
        }
      }
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);