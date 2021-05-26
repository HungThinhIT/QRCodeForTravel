import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { withNavigation } from '@react-navigation/compat';

const LabelPicker = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { label, initText,onValueChange,selectedValue } = props
    //var iniText = iniText;
    // if(iniText==null){
    // }
    return (
        <SafeAreaView style={styles.formInput}>
            <Text>{label}</Text>
            <SafeAreaView style={styles.formInput1}>
            <Picker
                selectedValue={initText}
                onValueChange={onValueChange}
                style={{borderColor:'black'}}
                >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
                <Picker.Item label="Khác" value="Khác" />
            </Picker>
            </SafeAreaView>
        </SafeAreaView>
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

export default LabelPicker;