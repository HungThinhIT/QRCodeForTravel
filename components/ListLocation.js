import React, {useState} from 'react';
import {  Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput, ScrollView, } from 'react-native';
import Star from 'react-native-star-view';

const ListLocation = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { dataList, navigation } = props;

    const Item = ({ navigation, id, name, img,add,rate, numRate,  }) => (
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('DetailLocation',{id:id}); }}>
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
    const renderItem = ({ item }) => (
        <Item navigation={navigation} id={item.id} name={item.data.name} img={item.data.thumbnail} add={item.data.address} rate={item.data.rating} numRate={item.data.user_rating.length}/>
    );
    return (
        <ScrollView >
            <View style={styles.backgroundBorder} />
            <FlatList
                style={styles.listView}
                data={dataList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
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

export default ListLocation;