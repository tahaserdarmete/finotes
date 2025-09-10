import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GETSTARTED, LOGIN, REGISTER } from '../utils/routes';
import GetStarted from '../screens/getStarted';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.FIRST,
        },
      }}
    >
      <Stack.Screen name={GETSTARTED} component={GetStarted} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
