import 'react-native-gesture-handler';
// import * as React from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableHighlight, Button, Alert, CheckBox } from 'react-native';
import { LabelInputText, ButtonModel } from "../components";
import React, { useState } from "react";
import {db, auth} from "../firebase/firebase"

const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};
export default function Login({ navigation, props }) {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const SignUp = () => {
        navigation.navigate('Sign Up');
    };

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (evt) => {
        auth
        .signInWithEmailAndPassword(name, pass)
        .then(() => navigation.navigate('Main'))
        .catch(error => Alert.alert("Message:"+ error.message))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A7FD9', flexDirection: 'column' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: "80%", borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff' }}>
                <View style={styles.space}>
                    <Image
                        style={{
                            marginTop: 30,
                            width: 100,
                            height: 100,
                        }}
                        source={require("../assets/logo.png")}
                    />
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ marginTop: 10, width: 250 }}>
                        <LabelInputText initText="nhavo@gmail.com" label="Email"
                            onChangeText={name => setName(name)} defaultValue={name} secureTextEntry={false} />
                    </View>
                    <View style={{ marginTop: 10, width: 250 }}>
                        <LabelInputText initText="*****" label="Mật Khẩu"
                            onChangeText={pass => setPass(pass)} defaultValue={pass} secureTextEntry={true} />

                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={{ marginTop: 5 }}>Ghi nhớ tài khoản của tôi</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <ButtonModel label="ĐĂNG NHẬP" onPress={() => handleSubmit()} />
                            <Text style={{ marginTop: 10 }} onPress={SignUp}>Tạo tài khoản mới</Text>
                        </View>

                    </View>
                </View>
            </View>
        </View >
    );
}
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
});