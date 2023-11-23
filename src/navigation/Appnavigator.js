import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screen/Home';
import Save from '../screen/Save';

const Stack = createStackNavigator();

const Appnavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="Save" component={Save} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appnavigator;
