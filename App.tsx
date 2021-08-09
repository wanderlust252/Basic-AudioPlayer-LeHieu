import 'react-native-gesture-handler';
import 'webgltexture-loader-expo-camera';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
