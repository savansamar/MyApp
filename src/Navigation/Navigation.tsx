import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../Public/Main'
import News from '../Private/News'
import Country from '../Component/Country';
import Weather from '../Component/Weather';

export type RootStackParam = {
  Home: undefined;
  News: {item:any};
  Country:{item:any};
  Weather:{item:any}
};

const Stack = createNativeStackNavigator<RootStackParam>();

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Main} options={{headerShown:false}} />
      <Stack.Screen name="News" component={News} options={{headerShown:false}} />
      <Stack.Screen name="Country" component={Country} options={{headerShown:false}} />
      <Stack.Screen name="Weather" component={Weather} options={{headerShown:false}} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})