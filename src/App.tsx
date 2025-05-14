// src/App.tsx
import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeEventEmitter, NativeModules} from 'react-native';
import tips from './services/tips';

import HomeScreen from './screens/Home';
import AddRuleScreen from './screens/AddRule';

type RootStackParamList = {
  Home: undefined;
  AddRule: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // listener general para eventos BLOCKED_APP
  useEffect(() => {
    const emitter = new NativeEventEmitter(NativeModules.Blocker);
    const sub = emitter.addListener('BLOCKED_APP', () => {
      const tip = tips[Math.floor(Math.random() * tips.length)];
      Alert.alert('¡Enfoque!', tip);
    });
    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Mis Bloqueos'}}
        />
        <Stack.Screen
          name="AddRule"
          component={AddRuleScreen}
          options={{title: 'Añadir Bloqueo'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
