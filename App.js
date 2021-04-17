import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation/Screens";
import MinorScreen from "./navigation/MinorScreen";
import MapPicker from './screens/MapPicker';
import AddLocation from "./screens/Addlocation";

export default function App() {
  return (
    // <NavigationContainer>
    //   <AddLocation/>
    // </NavigationContainer>
    <AddLocation/>
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