import React, { useEffect, useState } from 'react';
import {  Image, Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { firebase, firestore, auth} from "../firebase/firebase";
import Star from 'react-native-star-view';
import { ListLocation } from '../components';

const loadFavor = async()=>{
    const user = await auth().currentUser;
    if (user != null) {
        var region = [];
        const favor = await firestore().collection('users').doc(user.email).get();
        const data = favor._data.favorite_locations;
        for (let i = 0; i < data.length; i++) {
            var id = data[i];
            const loca = await firestore().collection('location').doc(data[i]).get().then(data=>{
                var specificRegion = {
                    id: id,
                    data: data._data
                }
                region.push(specificRegion);
            })
        }
    }else{
        console.log("Null");
    }
    return region;
}

export default function Favorite({ navigation }) {
    const [favorities, setFavorities] = useState([]);
    React.useEffect(() => {
        loadFavor().then(data=>{setFavorities(data);})
        const unsubscribe = navigation.addListener('focus', () => {
            auth().onAuthStateChanged(function(user) {
                if (!user) {
                    navigation.navigate('Log In');
                } 
            });
        });
        return unsubscribe;
      }, [navigation]);
      console.log(favorities);
    return (
        <ListLocation dataList={favorities} navigation={navigation} />
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