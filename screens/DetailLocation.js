import React, { Component } from "react";
import { FlatList, Text, View, Image, StyleSheet, SafeAreaView, ScrollView, Button, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import Star from 'react-native-star-view';
// import { Entypo, AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        const imagesList = []
        console.log("Get data!")

        const app = prepareUploadImageToStorage();
        try {
            var detailLocationSnapshot = await firestore().collection("location").doc(id).get();
            const data = detailLocationSnapshot.data()
            data.image.forEach(item => {
                imagesList.push({
                    url: item
                })
            })
            setImages([...imagesList])
            console.log("Images", images)
            setDetailLocation({...data});
            console.log("Detail location: ", detailLocation);
        } catch (error) {
            console.log(error)
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
                    <ScrollView
                        style={styles.scrollView}
                        horizontal={true}>
                        {images.map((item) => (
                            <Image
                                style={{
                                    height: 150,
                                    width: 250
                                }}
                                source={{ uri: item.url }} 
                            />
                        ))}
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
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    {/* FIXME: Replace with another fonts */}
                                    {/* <Entypo name="eye" size={24} color="black" /> */}
                                    <Icon style={{}} name="eye" size={15} color="black" />
                                    <Text style={{ marginTop: 3 }}> 999</Text>
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
                                <Icon style={{}} name="heart" size={15} color="red" />

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