import React, { Component } from "react";
import {  Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { auth } from "../firebase/firebase";
// StatusBar.setHidden(true);StatusBar,

const categories = [
    { id: 1, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
    { id: 2, name:'Suối khoáng Thần Tài',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg'},
    { id: 3, name:'Biển An Bàng',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg'},
    { id: 4, name:'Vinpearl Nam Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg'},
    { id: 5, name:'Công viên văn hóa Ấn Tượng Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png'},
    { id: 6, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
];

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
const loadFavor = async()=>{
    const user = await auth.currentUser;
    if (user != null) {
        console.log(user.email);
        const app = prepareUploadImageToStorage();
        const favor = await firestore().collection('users').doc(user.email).get();
        const data = favor._data.favorite_locations;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
        }

    }else{
        // navigation.navigate('Log In');
        console.log("Null");
    }
    
}

const Item = ({ name, img,add }) => (
    <TouchableOpacity style={styles.container} onPress={() => { loadFavor() }}>
        <Image source={{uri: img}}
            style={styles.Catimg}
        />
        <View style={styles.cont}>
            <Text style={styles.nameqr}>{name}</Text>
            <Text style={styles.nameadd}>{add}</Text>
        </View>
    </TouchableOpacity>
);

export default function Favorite({ navigation }) {
    const renderItem = ({ item }) => (
        <Item name={item.name} img={item.img} add={item.add}/>
    );
    return (
        <SafeAreaView >
            <FlatList
                style={styles.listView}
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        padding:10,
        borderRadius:10,
        backgroundColor:'#FFF',
        shadowColor:'#f20',
        marginBottom:10,
        flexDirection: 'row',
        
    },
    Catimg:{
        width:60,
        height:60,
        flex: 1,
    },
    nameqr:{
        marginLeft:10,
        flexGrow:1,
        flex: 1,
        fontSize: 16,
        fontWeight: "bold"
    },
    nameadd:{
        marginLeft:10,
        flexGrow:2,
        flex: 2,
    },
    cont:{
        flexDirection: "column",
        flex: 5,
    },
    listView: {
        paddingHorizontal: 10,
    },
  });