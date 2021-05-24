import React, { Component } from "react";
import { FlatList, Text, View, Image, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import Star from 'react-native-star-view';
// import { Entypo, AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { auth } from "../firebase/firebase";

export default function DetailLocation({ navigation, route }) {

    const getInitialState = {
        latitude: 15.98,
        longitude: 108.14,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };
    const [location, onChangeLocation] = React.useState(getInitialState);
    const [paddingTop, onChangePaddingTop] = React.useState(0);
    const [detailLocation, setDetailLocation] = React.useState({});
    const [id, setId] = React.useState(route.params.id)
    const [images, setImages] = React.useState([])

    const onRegionChange = (location) => {
        onChangeLocation(location);
    }

    function onMapReady() {
        onChangePaddingTop(1);
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((granted) => {
                //alert(JSON.stringify(granted)); // just to ensure that permissions were granted
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var currentLongLat = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }
                        onRegionChange(currentLongLat);

                    },
                    (err) => console.log(err),
                    { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
                );
            });
        }
    }

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
    const loadData = async () => {
        const user = await auth.currentUser;
        const locationList = []
        console.log("Get data!")
        if (user != null) {
            // console.log(user.email);
            const app = prepareUploadImageToStorage();
            const location = await firestore()
                .collection('location')
                .doc(id)
                .get()
                .then(snapshot => {
                    console.log("Detail Location: ", snapshot.data())
                    setDetailLocation({...snapshot.data()})
                    const img = detailLocation.image
                    setImages([...img])
                    console.log("Image: ", images)
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
            // console.log("Test")    
            // console.log(locationList.image)
        }else{
            console.log("Null");
        }
        
    }

    React.useEffect(() => {
        console.log("ID: ", route.params.id)
        loadData()
        // console.log("Image: ", detailLocation.image)
        onRegionChange(location);
    }, []);

    return (
        <ScrollView style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={styles.map}>
                {/* <Text> Map in here</Text> */}
                {/* <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                /> */}
                <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={[styles.map, { paddingTop: 15 }]}
                // initialRegion={location}
                onRegionChange={onRegionChange}
                followsUserLocation={true}
                showsUserLocation
                showsMyLocationButton={true}
                showsCompass={true}
                onMapReady={onMapReady}
                toolbarEnabled={true}
                zoomEnabled={true}
                rotateEnabled={true}
                onPress={(e) => {
                    var currentLongLat = {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                    }
                    onChangeLocation(currentLongLat);
                }}
            >
            </MapView>
            </View>
            <View>
                <SafeAreaView>
                    {/* <FlatList
                        data={images}
                        renderItem={(image) => (
                            <Image
                                style={{
                                    height: 150,
                                    width: 250
                                }}
                                source={{ uri: image }} 
                            />
                        )}
                    /> */}
                    <ScrollView
                        style={styles.scrollView}
                        horizontal={true}>
                        {images.map((item) => (
                            <Image
                                style={{
                                    height: 150,
                                    width: 250
                                }}
                                source={{ uri: item }} 
                            />
                        ))}
                        {/* <Image
                            style={{
                                height: 150,
                                width: 250
                            }}
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/d857/de8e/d54537400a84279101e7d01a4f4ed207?Expires=1619395200&Signature=eVzpCXuR0YCnhirstBQhZqc9S~f0MlaFiOvo3Rf5rrsVVVTCMbjwqIe7kx0d5G1R2v70WuISIvF-id3jJpLGH463a5gX5~xvB0bHWdh3cCSOuxFVwApA9015X8VPHT5vPNFOQ3nqn69jr8uaRN3fVeeOFQdfIgL-tUC30hpOmIqdz1nXb4BJZ9gMcpp71rgpi6UxnJw0k7wAr7K6I0t3AFIH8JCALNKTOAx-eUyE5QnLZCn7MvN-W5SkBiVv7gtiY9DfOVPMXGrmFa9JPyaH0~YDIhUc~uGuutP1TfncKbeWTI2gvy1U~n-VPPpgrF4-Fvfvhy3pYYbCLuZEG2EveQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', }} />
                        <Image
                            style={{
                                height: 150,
                                width: 200
                            }}
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/7d67/01d5/d2c5468fff12abfa44be90e2df1e48d4?Expires=1619395200&Signature=O8Ut6x99htnAVov9rJH17lU-ssuVJBHYFCjY3FpXVQHi~vG4s77~ku4O6DYFsinZabwQYtKMiRVo1SEZ0f8QsPtzFNPEcWlSdgPBln-5tSKvEJkncAZ~ueXDK-17ljNtpgpjtXO-pnx2wsIikVDdyVOqCcmXqNiSUX1JrT-RrbBQe~Ar85QmezKS6Nsoz~XIW~t5SpddTZebdZfg-sgyyU3DuqYasqGev6r0CpvO27FEK~eFUjGBAfpkg~TMg~JyXcQEClewgh4XNi7pi6XK7WLD7kgWxh7mc-~VmmOd-hBKxdHnK6yHOAbFeu~KOI7nEGjNVljfQD7Qf~NEMTVPsg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', }} />
                        <Image
                            style={{
                                height: 150,
                                width: 200
                            }}
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/6c09/8f9d/6c0e4ed05381f329c92ee4a541f81e37?Expires=1619395200&Signature=YYX2N~Gj~qEyVQni03A-W76wNHtOUUaLARBvfYKQhoFJpYgymhrMqyfrk3meAMubblcDORe3CD014g1V9wXrRtj90fynvY-1x3rzE0YwNlnntan89flypsPEsnmoNLL4uGtbGHssQ4Kvv-Zt~iudlSFTNpWwv0isVefCU2f89YIXGfftwJJPIakpydVXYB7Un7jvrCK7DE1G2rGDLGQWgMKcZ9vkHX0gX2Mv-v7swLng51QL5q9qge6-I551JAQh07ZI7OxPZicduFlvrP2iPzoc3ccNfsViSjgUBcG0YS-JUD2toN~SWQUk8bZaRJQbUGvp5HZMuHG9Rj3pNRG3HQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', }} /> */}
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.information}>
                    <View style={styles.headOption}>
                        <Text style={styles.title} >{detailLocation.name}</Text>
                    </View>
                    <View style={styles.detailInformation}>
                        <View style={{ flex: 3, }} >
                            <View
                                style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 12 }}>{detailLocation.address}</Text>
                            </View>
                            <View style={styles.starAndView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Star score={detailLocation.rating} style={styles.starStyle} />
                                    <Text style={{ marginTop: 3 }}> {detailLocation.rating}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* FIXME: Replace with another fonts */}
                                    {/* <Entypo name="eye" size={24} color="black" /> */}
                                    <Text style={{ marginTop: 3 }}> 420</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{ color: 'red' }}
                                onPress={() => Alert.alert('Touched favorite button.')}
                                style={styles.favoriteButton}
                            >
                                <Text style={{ color: "red" }}>Thêm vào yêu thích</Text>
                                {/* FIXME: Replace with another fonts */}
                                {/* <AntDesign name="heart" size={20} color="red" /> */}
                            </TouchableOpacity>
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
                       {'\t'}{detailLocation.detail}
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