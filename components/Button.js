import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
// import { withNavigation } from '@react-navigation/compat';

const ButtonModel = (props) => {
    const { label, initText, onPress } = props
    const [text, onChangeText] = useState("");

    return (
        <TouchableHighlight
            onPress={onPress}
            style={{
                width: "100%",
                height: 35,
                borderRadius: 10,
                color: "#111",
                alignItems: "center",
                backgroundColor: "#0A7FD9",
                justifyContent: "center"
            }}>
            <Text style={{ color: "#fff" }}>{label}</Text>
            {/* <Button onPress={() => Alert.alert('Left button pressed')}
                                    title="SAVE"
                                /> */}
        </TouchableHighlight>
    )
}

export default ButtonModel;