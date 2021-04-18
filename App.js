import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MinorScreen from "./navigation/MinorScreen";
import MapPicker from './screens/MapPicker';
import AddLocationScreen from './navigation/AddLocationScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AddLocationScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});