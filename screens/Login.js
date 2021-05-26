import 'react-native-gesture-handler';
import { Text, View, Image, StyleSheet, Alert, CheckBox, Dimensions} from 'react-native';
import { LabelInputText, ButtonModel } from "../components";
import React, { useState} from 'react';
import { auth} from "../firebase/firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({ navigation }) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const hasUnsavedChanges = Boolean(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            auth().onAuthStateChanged(function(user) {
                if (user) {
                    goBackScreen(); // Check login, if true -> go back
                } 
            });
        });
        return unsubscribe;
      }, [navigation]);

    const SignUp = () => {
        navigation.navigate('Sign Up'); //Click Sign Up
    };

    const goBackScreen = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        auth()
            .signInWithEmailAndPassword(name, pass)
            .then(() => {
                console.log("success");
                navigation.navigate("Main");
              })
            .catch(error => Alert.alert("Message:" + error.message))
    }
    return (
            <KeyboardAwareScrollView>
                <View style={styles.firstPart}>
                <View style={styles.backgroundBorder} />
                    <Text style={styles.headerTitle}>đăng nhập</Text>
                    <View style={styles.centerPart}>
                        
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
                                    onChangeText={name => setName(name)} defaultValue={name} />
                            </View>
                            <View style={{ marginTop: 10, width: 250 }}>
                                <LabelInputText initText="*****" label="Mật Khẩu"
                                    onChangeText={pass => setPass(pass)} defaultValue={pass} secureTextEntry={true} />

                            </View>
                            <View style={{ marginTop: 5 }}>
                                {/* <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={{ marginTop: 5 }}>Ghi nhớ tài khoản của tôi</Text>
                        </View> */}
                                <View style={{ marginTop: 10 }}>
                                    <ButtonModel label="ĐĂNG NHẬP" onPress={() => handleSubmit()} />
                                    <View style={styles.btnlogin}>
                                        <Text style={{ marginTop: 10,flex:1 }} onPress={SignUp}>Tạo tài khoản</Text>
                                    </View>
                                    <Text style={{ marginTop: 10 }} onPress={()=>navigation.navigate('Load')}>Về Trang chính</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View >
                <View style={styles.header}>
                    <View style={styles.headerTitleWrapper}>
                        <Text style={styles.headerTitle}></Text>
                    </View>
                </View>
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
    centerPart: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: "60%",
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    container: {
        paddingTop: 50,
    },
    backgroundBorder: {
        position: 'absolute',
        backgroundColor: '#0A7FD9',
        top: 0,
        left: 0,
        height: (Dimensions.get('window').height * 0.35),
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    contentGroup: {
        marginHorizontal: 20,
        marginTop: 10,
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
    header: {
        height: 55,
        alignItems: 'center',
        backgroundColor: "#0A7FD9",
        flexDirection: 'row',
    },
    btnlogin:{
        flexDirection:"row",
        marginTop:10
    }
});