import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { withNavigation } from '@react-navigation/compat';

const TextInfo = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { label, info } = props

    return (
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 3 }} >
                <Text>{label}</Text>
            </View>
            <View style={{ flex: 7 }} >
                <Text>{info}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formInput: {
        marginTop: 10,
    },
    formInput1:{
        maxHeight:40, 
        justifyContent:"center", 
        padding: 0, 
        marginTop:5 , 
        borderWidth : 1, 
        borderRadius:10 ,
        borderColor: 'lightgrey'
    }
});

export default TextInfo;