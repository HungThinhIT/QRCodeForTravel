import React, { Component } from "react";
import { Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput, ImageBackground, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from "../firebase/firebase";
import Star from 'react-native-star-view';

const renderItem = ({ item }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => {
            console.log(item.id)
            navigation.navigate('DetailLocation', {
                id: item.id
            })
        }}
    >
        <Image source={{ uri: item.thumbnail }}
            style={styles.Catimg}
        />
        <View style={styles.cont}>
            <Text style={styles.nameqr}>{item.name}</Text>
            <Text style={styles.nameadd}>{item.address}</Text>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <View style={{ flexDirection: 'row' }}>
                    <Star score={item.rating} style={styles.starStyle} />
                    <Text>{item.rating}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, justifyContent: "center" }}>
                        <Icon style={{}} name="eye" size={15} color="black" />
                        <Text style={{ fontSize: 10 }}>999</Text>
                    </View>

                    <View style={{}}>
                        <Icon style={{}} name="heart" size={18} color="red" />
                    </View>

                </View>
            </View>
        </View>
    </TouchableOpacity>

);

export default function Search({ route, navigation }) {

    const [keyword, setKeyword] = React.useState(route.params.keyword)
    const [location, setLocation] = React.useState([])
    const [search, setSearch] = React.useState([])

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const loadData = async () => {
        // const user = await auth.currentUser;
        const locationList = []
        console.log("Get data search!");
        let phoenix = removeAccents(keyword).toLowerCase();
        try {
            // console.log("Here");

            const locationCollectionRef = firestore().collection('location');

            locationCollectionRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    let title = removeAccents(doc.data().title.toString().toLowerCase());
                    if (phoenix.length <= 0) {
                        locationList.push({
                            ...location,
                            id: doc.id,
                            ...doc.data()
                        });
                    }
                    else if (title.includes(phoenix)) {
                        locationList.push({
                            ...location,
                            id: doc.id,
                            ...doc.data()
                        });
                    }
                });
                setLocation([...locationList]);
            });

        } catch (error) {
            console.log("BUG IN HERE");
            console.log(error)
        }

    }

    React.useEffect(() => {
        loadData();
    }, [])

    return (
        <SafeAreaView >
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.qrtr}>QR Travel</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Icon style={{}} name="search" size={24} color="#0A7FD9" />
                    <TextInput
                        style={styles.search}
                        placeholder="Tìm kiếm địa điểm đến"
                        placeholderTextColor="#0A7FD9"
                        onChangeText={(keyword) => { setSearch(keyword) }}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            setKeyword(search);
                            loadData();
                        }}
                        style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', paddingRight: 5, fontWeight: 'bold' }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Danh sách các địa điểm</Text>
                    </View>
                    <FlatList
                        style={styles.listView}
                        data={location}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // padding:10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#f20',
        marginBottom: 10,
        flexDirection: 'row',

    },
    qrtr: {
        marginLeft: 18,
        color: '#0A7FD9',
        fontSize: 22,
    },
    add: {
        color: '#0A7FD9',
        fontSize: 22,
        marginRight: 28,
        textAlign: 'right',
        flexGrow: 2,
    },
    Catimg: {
        width: 88,
        height: 82,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 15,
        // backgroundColor:"#FFFFFF",
        // borderBottomWidth :1,
        // borderBottomColor: '#000',
    },
    nameqr: {
        marginLeft: 10,
        flexGrow: 1,
        flex: 1,
        fontSize: 16,
        fontWeight: "bold"
    },
    nameadd: {
        marginLeft: 10,
        flexGrow: 2,
        flex: 2,
    },
    cont: {
        flexDirection: "column",
        flex: 5,
        marginRight: 10,
    },
    listView: {
        paddingHorizontal: 10,
    },
    search: {
        // margin:10,
        // height: 50,
        // borderWidth: 1,
        // borderRadius: 20,
        // paddingHorizontal: 12,
        borderColor: '#0A7FD9',
        borderRadius: 10,
        paddingVertical: 10,
    },
    searchContainer: {
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        paddingLeft: 10,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0A7FD9",
        marginLeft: 20,
        marginRight: 20
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10
    },
    title: {
        fontSize: 20
    },
    seeMore: {
        color: "#0A7FD9"
    },
    starStyle: {
        width: 100,
        height: 20,
        marginBottom: 10,
        marginLeft: 10
    },
});