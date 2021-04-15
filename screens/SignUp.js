import 'react-native-gesture-handler';
import * as React from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableHighlight, Button, Alert, CheckBox } from 'react-native';
import { LabelInputText, ButtonModel } from "../components";


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    space: {
        marginTop: 10
    },
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    SubmitButtonStyle: {

        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    commonInput: {
        marginTop: 10,
        width: 250
    },
});
const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};
export default function SignUp({ navigation }) {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const SignUp = () => {
        navigation.navigate('Sign Up');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A7FD9', flexDirection: 'column' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: "80%", borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff' }}>
                <View style={styles.space}>
                    <Image
                        style={{
                            marginTop: 25,
                            width: 100,
                            height: 100,
                        }}
                        source={require("../assets/logo.png")}
                    />
                </View>
                <View style={{ flex: 1, }}>
                    <View style={styles.commonInput}>
                        <LabelInputText initText="nhavo@gmail.com" label="Email" />
                    </View>
                    <View style={styles.commonInput}>
                        <LabelInputText initText="0905905905" label="Điện thoại" />
                    </View>
                    <View style={styles.commonInput}>
                        <LabelInputText initText="*****" label="Mật Khẩu" />
                    </View>
                    <View style={styles.commonInput}>
                        <LabelInputText initText="*****" label="Xác nhận mật Khẩu" />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <ButtonModel label="ĐĂNG NHẬP" onPress={() => Alert.alert('Left button pressed')} />

                    </View>
                </View>

            </View>
        </View >
    );
}