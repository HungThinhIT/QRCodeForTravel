import React, { useEffect, useState } from 'react';
import {  Image, Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { firebase, firestore, auth} from "../firebase/firebase";
import Star from 'react-native-star-view';
// StatusBar.setHidden(true);StatusBar,

    const categories = [
        { id: 1, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
        { id: 2, name:'Suối khoáng Thần Tài',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg'},
        { id: 3, name:'Biển An Bàng',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg'},
        { id: 4, name:'Vinpearl Nam Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg'},
        { id: 5, name:'Công viên văn hóa Ấn Tượng Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png'},
        { id: 6, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
    ];

const loadFavor = async()=>{
    const user = await auth().currentUser;
    if (user != null) {
        var region = [];
        const favor = await firestore().collection('users').doc(user.email).get();
        const data = favor._data.favorite_locations;
        for (let i = 0; i < data.length; i++) {
            const loca = await firestore().collection('location').doc(data[i]).get().then(data=>{
                var specificRegion = {
                    id: data[i],
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

    const renderItem = ({ item }) => (
        <Item navigation={navigation} id={item.id} name={item.data.name} img={item.data.thumbnail} add={item.data.address} rate={item.data.rating} numRate={item.data.user_rating.length}/>
    );
    return (
        <ScrollView >
            <View style={styles.backgroundBorder} />
            <FlatList
                style={styles.listView}
                data={favorities}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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