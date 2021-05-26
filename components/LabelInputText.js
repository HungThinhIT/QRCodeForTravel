import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
// import { withNavigation } from '@react-navigation/compat';

const LabelInputText = (props) => {
    const { label, initText, defaultValue, onChangeText, secureTextEntry,keyboardType, de } = props

    return (
        <SafeAreaView style={styles.formInput}>
            <Text>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder={initText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                defaultValue={defaultValue}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formInput: {
        marginTop: 10,
    },
    input: {
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
});

export default LabelInputText;