// import "react-native-get-random-values";
// import "react-native-url-polyfill/auto";
// import { ReadableStream } from "web-streams-polyfill";

// if (typeof global.ReadableStream === "undefined") {
//   global.ReadableStream = ReadableStream;
// }
// import { Buffer } from "buffer";
// global.Buffer = Buffer;

import React, {useState} from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SignupScreen from './Screens/SignupScreen';
import DashboardScreen from './Screens/DashboardScreen';
import ForgetPasswordScreen from './Screens/ForgetPasswordScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:8081/', 'yourapp://'],
  config: {
    screens: {
      Home: 'home',
      Login: 'login',
      Signup: 'signup',
      Dashboard: 'dashboard',
      ForgetPassword: 'forget-password',
    },
  },
};

export default function App() {
  const [user, setUser] = useState(true);
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={user ? 'Home' : 'Login'}
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: 'white'},
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'web' ? 0 : 40,
  },
});
