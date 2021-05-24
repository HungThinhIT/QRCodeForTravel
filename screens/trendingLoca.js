import React, { Component, useEffect, useState } from "react";
import {  Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput, } from 'react-native';
import firebase from '@react-native-firebase/app';
import Star from 'react-native-star-view';
import firestore from '@react-native-firebase/firestore';
import { auth } from "../firebase/firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
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

const loadFavor = async(navigation,id)=>{
    // const user = await auth.currentUser;
    // if (user != null) {
    //     console.log(user.email);
    //     const app = prepareUploadImageToStorage();
    //     const favor = await firestore().collection('users').doc(user.email).get();
    //     const data = favor._data.favorite_locations;
    //     for (let i = 0; i < data.length; i++) {
    //         console.log(data[i]);
    //     }

    // }else{
    //     // navigation.navigate('Log In');
    //     console.log("Null");
    // }
    //alert(id)
    navigation.navigate('DetailLocation',{id:id});
    
}
        
const Item = ({ navigation, id, name, img,add,rate, numRate,  }) => (
    <TouchableOpacity style={styles.container} onPress={() => { loadFavor(navigation, id) }}>
        <Image source={{uri: img}}
            style={styles.Catimg}
        />
        <View style={styles.cont}>
            <Text style={styles.nameqr}>{name}</Text>
            <Text style={styles.nameadd}>{add}</Text>
            <View style={styles.starAndView}>
                <View style={{ flexDirection: 'row' }}>
                    <Star score={rate} style={styles.starStyle} />
                    <Text style={{ marginTop: 3 }}> {rate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                                    {/* FIXME: Replace with another fonts */}
                                    {/* <Entypo name="eye" size={24} color="black" /> */}
                    <Text></Text>
                    <Text style={{ marginTop: 3 }}> {numRate}</Text>
                </View>
            </View>

        </View>
    </TouchableOpacity>
);
const getNameCity = async(cityName)=>{
    //alert(cityName);
    //loadFavor();
    //console.log("_____________________________________________");
    var region = [];
    const app = prepareUploadImageToStorage();
    const favor = await firestore().collection('location').where("city","==",cityName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var specificRegion = {
                id: doc.id,
                data: doc.data()
            }
            region.push(specificRegion);
        });
    });
    return region;
}

export default function TrendingLoca({ route, navigation }) {
    const [region, setRegion] = useState([]);
    //alert(route.params.name);
    var cityName = "Đà Nẵng";
    useEffect(() =>{
    getNameCity(cityName).then(data=>{setRegion(data.sort((a, b)=>b.data.rating - a.data.rating));});
    },[]);
    

    const renderItem = ({ item }) => (
        <Item navigation={navigation} id={item.id} name={item.data.name} img={item.data.image[0]} add={item.data.address} rate={item.data.rating} numRate={item.data.user_rating.length}/>
    );

    return (
        <SafeAreaView >
            <View style={styles.searchContainer}>
                {/* <Icon style={{}} name="search" size={24} color="#0A7FD9" /> */}
                 <TextInput 
                    style={styles.search}
                    placeholder={`Những địa điểm được yêu thích ở ${cityName}`}
                    placeholderTextColor="#0A7FD9" 
                    editable={false}
                /> 
            </View>
            {/* <View style={styles.titleContainer}>
                    <Text style={styles.title}>Các địa điểm yêu thích ở {cityName}</Text>
            </View> */}
            <View style={styles.backgroundBorder} />
            <FlatList
                style={styles.listView}
                data={region}
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
    
    headerTitle: {
        fontSize: 18,
        color: 'black',
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10
    },
    title: {
        paddingTop:5,
        paddingLeft:10,
        fontSize: 18
    },
    seeMore: {
        color: "#0A7FD9"
    },
    Catimg:{
        width: 76,
        height: 80,
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
    
    starAndView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '90%',
        paddingTop: 5
    },
    starStyle: {
        width: 100,
        height: 20,
        marginBottom: 10,
        marginLeft:10
    },

    searchContainer: {
        backgroundColor:"#FFFFFF",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        paddingLeft: 10,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0A7FD9",
        margin: 10
    },
    search: {
        // margin:10,
        // height: 50,
        // borderWidth: 1,
        // borderRadius: 20,
        // paddingHorizontal: 12,
        borderColor: '#0A7FD9',
        borderRadius: 10,
        fontSize:14
    },
    cont:{
        flexDirection: "column",
        flex: 5,
    },
    listView: {
        paddingHorizontal: 10,
    },
  });