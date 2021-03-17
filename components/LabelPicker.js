import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { withNavigation } from '@react-navigation/compat';

const LabelPicker = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { label, initText } = props
    return (
        <SafeAreaView style={styles.formInput}>
            <Text>{label}</Text>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Male" value="java" />
                <Picker.Item label="Female" value="js" />
                <Picker.Item label="Other" value="js" />
            </Picker>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formInput: {
        marginTop: 10,
    },
});

export default LabelPicker;