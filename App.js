import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation/Screens";
import AddLocation from "./screens/AddLocation";


export default function App() {
  return (
    // <NavigationContainer>
    //   <MyTabs />
    // </NavigationContainer>
    <AddLocation>

    </AddLocation>
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
