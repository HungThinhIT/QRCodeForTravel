import React, { Component, useEffect, useState } from "react";
import {  Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput, ScrollView, } from 'react-native';
import Star from 'react-native-star-view';
import { auth, firebase, firestore, storage } from "../firebase/firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListLocation } from "../components";

const getNameCity = async(cityName)=>{
    var region = [];
    const favor = await firestore().collection('location').where("city","==",cityName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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
    var cityName = route.params.name;
    useEffect(() =>{
    getNameCity(cityName).then(data=>{setRegion(data.sort((a, b)=>b.data.rating - a.data.rating));});
    },[]);
    

    const renderItem = ({ item }) => (
        <Item navigation={navigation} id={item.id} name={item.data.name} img={item.data.image[0]} add={item.data.address} rate={item.data.rating} numRate={item.data.user_rating.length}/>
    );

    return (
        <ScrollView >
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
            <ListLocation dataList={region} navigation={navigation} />
        </ScrollView>
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