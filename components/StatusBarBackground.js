import React, { useState } from "react";
import {View, StyleSheet, Platform } from 'react-native';

export default function Settings({ navigation }) {
    return (
        <View style={styles.statusBarBackground}/>
    );
}

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 37 : 0,
        backgroundColor: "#0A7FD9",
      }
})