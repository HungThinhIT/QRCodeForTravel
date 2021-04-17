import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation/Screens";
import AddLocation from "./screens/AddLocation";
import MinorScreen from "./navigation/MinorScreen";
import MapPicker from './screens/MapPicker';

export default function App() {
  return (
    <NavigationContainer>
      <MinorScreen />
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