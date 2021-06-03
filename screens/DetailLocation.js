import React, { Component, useState } from "react";
import { auth } from "../firebase/firebase";
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import Star from 'react-native-star-view';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default function DetailLocation({ route, navigation }) {
    const [id, setId] = useState(route.params.id)
    const [locationData, setLocationData] = useState({});
    const [slideImage, setSlideImage] = useState();
    const [location, onChangeLocation] = useState(getInitialState);
    const [paddingTop, onChangePaddingTop] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [currentFavoritedList, setCurrentFavoritedList] = useState([]);
    const onRegionChange = (location) => {
        onChangeLocation(location);
    }
    let getInitialState = {
        latitude: 15.766421,
        longitude: 108.123,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };


    function loadSlideImage() {
        if (typeof (slideImage) != 'undefined' && slideImage.length > 0) {
            return (
                <ScrollView
                    style={styles.scrollView}
                    horizontal={true}>
                    {
                        slideImage.map((item, i) => (
                            <Image
                                key={i}
                                style={{
                                    height: 150,
                                    width: 250
                                }}
                                source={{ uri: item, }} />
                        ))
                    }
                </ScrollView>
            )
        }
    }

    async function onLoadFirebaseLocation() {
        var tmpArray = []
        try {
            firestore().collection('location').onSnapshot(async (snapshot) => {
                snapshot.docs.map(async (doc) => {
                    if (doc.id == id) {
                        console.log(doc.data())
                        setLocationData(doc.data())
                        getInitialState.latitude = doc.data().lat
                        getInitialState.longitude = doc.data().long
                        tmpArray.push(doc.data().image)
                    }
                })
                setSlideImage(...tmpArray)
            });

            // Get current user
            auth().onAuthStateChanged(function (user) {
                if (user) {
                    setIsSignedIn(true);
                    firestore().collection('users').doc(user.email).get().then((data) => {
                        var value = data._data;
                        favorites = value.favorite_locations;
                        setCurrentFavoritedList(favorites);
                        const found = favorites.find(function (el) {
                            return el == id;
                        });
                        if (typeof found != 'undefined') {
                            setIsFavorited(true);
                        }
                    });
                } else {
                    setIsSignedIn(false);
                }
            });
        } catch (error) {
            console.log("ERROR IN DETAIL LOCATION");
            console.log(error);
        }

    }

    function onUpdateFavorite(favorites) {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                setIsSignedIn(true);
                firestore().collection('users').doc(user.email).update(
                    {
                        favorite_locations: favorites,
                    })
                    .then(() => {
                        console.log("updated");
                    });
            } else {
                setIsSignedIn(false);
            }
        });
    }

    function onFavoriteHandle(id, type,) {
        let currentFavorite = currentFavoritedList;
        if (type == 'add') {
            currentFavorite.push(id);
            onUpdateFavorite(currentFavorite);
            setIsFavorited(true);
        }
        else if (type == 'remove') {
            var index = currentFavorite.indexOf(id);
            if (index > -1) {
                currentFavorite.splice(index, 1);
                onUpdateFavorite(currentFavorite);
                setIsFavorited(false);
            }
        }
        else {
            console.log(" ERROR DO NOT KNOWN TYPE");
        }
    }

    // function onMapReady() {
    //     onChangePaddingTop(1);
    //     if (Platform.OS === 'android') {
    //         PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //         ).then((granted) => {
    //             //alert(JSON.stringify(granted)); // just to ensure that permissions were granted
    //             navigator.geolocation = require('@react-native-community/geolocation');
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     var currentLongLat = {
    //                         // latitude: position.coords.latitude,
    //                         // longitude: position.coords.longitude,
    //                         latitude: '15.766421',
    //                         longitude: '108.123',
    //                         // latitudeDelta: 0.2,
    //                         // longitudeDelta: 0.2,
    //                     }
    //                     onRegionChange(currentLongLat);

    //                 },
    //                 (err) => console.log(err),
    //                 { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
    //             );
    //         });
    //     }
    // }

    React.useEffect(() => {
        onRegionChange(location);

        async function getDownloadUrl(item) {
            const url = await storageRef.child(`location/${item}`).getDownloadURL();
            console.log(url);
            return url
        }


        onLoadFirebaseLocation()

    }, []);

    function favoriteRender() {
        if (isFavorited) {
            return (
                <TouchableOpacity
                    style={{ color: 'red' }}
                    onPress={() => { onFavoriteHandle(id, 'remove') }}
                    style={styles.favoriteButton}
                >
                    <Text style={{ color: "red" }}>Gỡ bỏ yêu thích</Text>
                    {/* FIXME: Replace with another fonts */}
                    <Icon name="closesquare" size={20} color="red" />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                style={{ color: 'red' }}
                onPress={() => { onFavoriteHandle(id, 'add') }}
                style={styles.favoriteButton}
            >
                <Text style={{ color: "red" }}>Thêm vào yêu thích</Text>
                {/* FIXME: Replace with another fonts */}
                <Icon name="heart" size={20} color="red" />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={styles.map}>

                <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={[styles.map, { paddingTop: 15 }]}
                    region={{
                        latitude: typeof (locationData.lat) == 'undefined' ? 0 : locationData.lat,
                        longitude: typeof (locationData.long) == 'undefined' ? 0 : locationData.long,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsMyLocationDataButton={true}
                    showsCompass={true}
                    // onMapReady={onMapReady}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={true}

                >
                    <Marker
                        coordinate={{
                            latitude: typeof (locationData.lat) == 'undefined' ? 0 : locationData.lat,
                            longitude: typeof (locationData.long) == 'undefined' ? 0 : locationData.long,
                        }}
                        title={typeof (locationData.name) == 'undefined' ? 'Trống' : locationData.name}
                        description={typeof (locationData.address) == 'undefined' ? 'Trống' : locationData.address}
                    />
                </MapView>
            </View>
            <View>
                <SafeAreaView>
                    {loadSlideImage()}
                </SafeAreaView>
                <SafeAreaView style={styles.information}>
                    <View style={styles.headOption}>
                        {/* <Text style={styles.title} >Asia Park – Sunworld Đà Nẵng Wonders</Text> */}
                        <Text style={styles.title} > {locationData.name}</Text>
                    </View>
                    <View style={styles.detailInformation}>
                        <View style={{ flex: 3, }} >
                            <View
                                style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 12 }}>{locationData.address}</Text>
                            </View>
                            <View style={styles.starAndView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Star score={locationData.rating} style={styles.starStyle} />
                                    <Text style={{ marginTop: 3 }}> {locationData.rating} </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* FIXME: Replace with another fonts */}
                                    {/* <Entypo name="eye" size={24} color="black" /> */}
                                    <Text style={{ marginTop: 3 }}> 420</Text>
                                </View>
                            </View>
                            {isSignedIn ? favoriteRender() : (
                                <TouchableOpacity
                                    style={{ color: 'red' }}
                                    onPress={() => { navigation.navigate("Log In") }}
                                    style={styles.favoriteButton}
                                >
                                    <Text style={{ color: "red" }}>Đăng nhập để thêm vào yêu thích</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                        {/* QR CODE GENERATE  */}
                        <View style={{ flex: 1 }} >
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%'
                                }}
                                source={{ uri: 'https://s3-alpha-sig.figma.com/img/59b2/5a79/aa8cefd1a60e87f9557138ed02943e73?Expires=1619395200&Signature=RNgE2alGlUfmPc7-7LTD28D9Vnu5jSpKBP2ci9WD7Fh5Dxk950GesltQ9KqgEm~BktI3ECwY0P-7EmFGIzhQxWdTiBfH-ag-RXy95goL6gUtztJKIAEzsA5GxHQpIxll1BIgDkvo0RoWHLQE-4yL7z7cqb5QOYHKFCRHy8lzSAH17s9XAYQtV2b085ZRhoKvZ1JWSpR118YA3edju-bZ-gf2TMXkEth8lpBuLjRFqOSvSfMGSfdreyhrVviU-uYzTCxZwJloj3RW-avDLcw0SqEQE5OjU38PaTDZUaNAG11WzjwicKWkjyX2-2DR~0sHmnjPDldJjgzh38naJGTgYQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', }} />
                        </View>

                    </View>
                </SafeAreaView>
                <SafeAreaView>
                    <Text style={styles.textContentView}>
                        {'\t'}{locationData.detail}
                    </Text>
                </SafeAreaView>
            </View>
        </ScrollView >


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 22,
        padding: 0,
        marginTop: 25,
        backgroundColor: 'white'
    },
    item: {
        fontSize: 18,
        height: 44,
    },
    map: {
        height: 250, //stock 250
    },
    scrollView: {
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        fontSize: 42,
    },
    information: {
        paddingHorizontal: 10
    },
    headOption: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    detailInformation: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'white'
    },
    actionForm: {

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
    },
    favoriteButton: {
        width: "90%",
        height: 35,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        justifyContent: "space-between"
    },
    textContentView: {
        textAlign: 'justify',
        paddingVertical: 20,
        paddingHorizontal: 10,
        lineHeight: 20
    }
});
const starStyle = {
    width: 100,
    height: 20,
    // marginBottom: 20,
};