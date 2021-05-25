import 'react-native-gesture-handler';
import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableHighlight, Button, Alert, Dimensions, CheckBox } from 'react-native';
import { LabelInputText, ButtonModel } from "../components";
import { auth } from "../firebase/firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
export default function SignUp({ navigation}) {
    // const [isSelected, setSelection] = React.useState(false);
    // const Login = () => {
    //     navigation.navigate('Log In');
    // };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = (evt) => {
        if (email === "" || password === "" || confirmPass === "" || phone === "") {
            Alert.alert(`Vui lòng nhập đầy đủ thông tin!`);
        } else {
            if (password === confirmPass) {
                auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredentials)=>{
                        if(userCredentials.user){
                          userCredentials.user.updateProfile({
                            displayName: 'Anonymous',
                            photoURL: phone,
                          }).then((s)=> {
                            createFavor(email);
                            Alert.alert("Đăng ký thành công!");
                            auth().signOut().then(()=> navigation.navigate('Log In'));
                          })
                        }
                    }).catch(error => Alert.alert("Message:" + error.message))
            } else {
                Alert.alert(`Mật khẩu không trùng khớp!`);
            }
            
        }
    }

    const createFavor = (email) =>{
        const app = prepareUploadImageToStorage();
        const addFirebase = firestore().collection('users');
        addFirebase.doc(email).set({address: "null",gender:"null",point:2000,favorite_locations : []});
    }
    const prepareUploadImageToStorage = () =>{
        let app;
        var stCredentials ={
            apiKey: "AIzaSyAcH9iGfbmP1Xzx8j5OB1wNyGTkHoCAvmk",
            appId:"1:138826178666:web:62961ee1ec17c2899faa13",
            authDomain: "qrtravel-vku.firebaseapp.com",
            databaseURL: "https://qrtravel-vku-default-rtdb.firebaseio.com",
            storageBucket: "qrtravel-vku.appspot.com",
            messagingSenderId: "138826178666",
            projectId: "qrtravel-vku",
            measurementId: "G-9ZZVLC2KNJ"
        }
        if(firebase.apps.length === 0){
            app = firebase.initializeApp(stCredentials);
        }else{
            app = firebase.app();
        }
        return app;
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.firstPart}>
            <View style={styles.backgroundBorder} />
                    <Text style={styles.headerTitle}>đăng ký</Text>
                <View style={styles.centerPart}>
                    <View style={styles.space}>
                        <Image
                            style={{
                                marginTop: 20,
                                width: 100,
                                height: 100,
                            }}
                            source={require("../assets/logo.png")}
                        />
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={styles.commonInput}>
                            <LabelInputText initText="email@gmail.com" label="Email"
                                onChangeText={email => setEmail(email)} defaultValue={email} />
                        </View>
                        <View style={styles.commonInput}>
                            <LabelInputText initText="099988889" label="Điện thoại" onChangeText={phone => setPhone(phone)} defaultValue={phone} keyboardType="numeric"/>
                        </View>
                        <View style={styles.commonInput}>
                            <LabelInputText initText="*****" label="Mật Khẩu" onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={true} />
                        </View>
                        <View style={styles.commonInput}>
                            <LabelInputText initText="*****" label="Xác nhận mật Khẩu" onChangeText={confirmPass => setConfirmPass(confirmPass)} defaultValue={confirmPass} secureTextEntry={true} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <ButtonModel label="ĐĂNG KÝ" onPress={() => handleSubmit()} />
                            {/* <Text style={{ marginTop: 10 }} onPress={Login}>Đăng Nhập</Text> */}
                        </View>
                    </View>
                </View>
            </View >
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    firstPart: {
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    container: {
        paddingTop: 50,
    },
    backgroundBorder: {
        position: 'absolute',
        backgroundColor: '#0A7FD9',
        top: 0,
        left: 0,
        height: (Dimensions.get('window').height * 0.4),
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
    centerPart: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: "75%",
        borderRadius: 20,
        backgroundColor: '#fff'
    }
});