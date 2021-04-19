import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { LabelInputText, LabelPicker } from '../components';
import { db, auth } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
const editForm = (phone,name) => {
    return (
        <View style={styles.containerBody}>
            <Text style={styles.titleInfo}>Thông tin của bạn</Text>
            <LabelInputText label={'Họ và Tên'} initText={name}/>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 7 }} >
                    <LabelInputText label={'Số điện thoại'} initText={phone} />

                </View>
                <View style={{ flex: 3, paddingLeft: 5 }} >
                    <LabelInputText label={'Giới tính'} initText={'Nam'} />
                </View>
            </View>
            <LabelInputText label={'Địa chỉ'} initText={'address'} />
            {/* <LabelPicker label="Giới tính"/> */}
        </View>
    );
}

const viewForm = (phone,name) => {
    return (
        <View style={styles.containerBody}>
            <Text style={styles.titleInfo}>Thông tin của bạn</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Họ và Tên</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>{name}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Số điện thoại</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>{phone}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                <View style={{ flex: 3 }} >
                    <Text>Giới tính</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>Nam</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Địa chỉ</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>{'address'}</Text>
                </View>
            </View>
        </View>
    );
}

const hanldeButtonText = (isEditable) =>{
    if(isEditable ){
        return 'Save'
    }
    return 'Edit'
}

export default function Profile({ navigation }) {
    const [isEditable, setIsEditable] = useState(false);
    const [editOrSaveText, setEditOrSaveText] = useState('Edit');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    useEffect(()=>{
        getData();
    },[])
    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key');
            if (value !== null) {
                console.log(JSON.parse(value));
                const user = JSON.parse(value);
                setName(user.displayName);
                setEmail(user.email);
                var phone1 = user.photoURL;
                phone1 == null ? setPhone("Trống") : setPhone(user.photoURL);
                console.log("S:"+user.photoURL);
            }else{
                AsyncStorage.removeItem('@storage_Key');
                console.log("E: "+value);
                navigation.navigate('Log In');
            }
        } catch (error) {
        }
    }

    const Logout = () => {
        AsyncStorage.removeItem('@storage_Key');
        const user = auth.currentUser;
        if (user != null) {
            auth.signOut().then(()=> navigation.navigate('Log In'));
        }else{
            navigation.navigate('Log In');
        }
    };

    return (
        <View >
            <TouchableOpacity style={styles.editAndSaveBtn} onPress={() => {
                setIsEditable(!isEditable)
            }
            }>
                <Text>
                    {/* FIXME: Replace with another fonts */}
                    {/* <Feather name="edit" size={24} color="black" /> */}
                 {hanldeButtonText(isEditable)}
                </Text>
            </TouchableOpacity>
            <View style={styles.containerHead}>
                <View style={styles.blockLogo}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri:'data:image/png;base64,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',
                          }}
                    />
                </View>
                <Text style={styles.fullName}>{name}</Text>
                <Text>{email}</Text>
            </View>
            {isEditable == true ? editForm(phone,name) : viewForm(phone,name)}
            {/* { editForm()} */}
            {/* // { viewForm()} */}
            <View style = {styles.logout}>
                <Text style={{ marginTop: 10 }} onPress={Logout}>Đăng Xuất</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    editAndSaveBtn: {
        paddingTop: 30,
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        textAlign: 'left'
    },
    containerHead: {
        paddingTop: 20,
        // flexDirection: 'column',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#007AFF',
        borderWidth: 1.5,
        resizeMode: 'cover'
    },
    blockLogo: {
        textAlign: 'center',
        // backgroundColor: 'red',
    },
    containerBody: {
        paddingTop: 10,
        paddingHorizontal: 15
    },
    fullName: {
        fontWeight: 'bold',
        fontSize: 20
    },
    titleInfo: {
        // backgroundColor: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        alignItems: 'flex-start',
        textAlign: 'left'
    },
    logout:{
        marginTop:30,
        alignItems:"center",
    }
});