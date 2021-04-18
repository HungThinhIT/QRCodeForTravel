import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Alert, PermissionsAndroid } from 'react-native';
import MapView, { Marker, OverlayComponent } from 'react-native-maps';
// import * as Permission from 'expo-permissions';
import { ButtonModel } from "../components";

export default function MapPicker({ navigation }) {

    const getInitialState = {
        latitude: 15.98,
        longitude: 108.14,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };
    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }
    const [location, onChangeLocation] = React.useState(getInitialState);
    const [paddingTop, onChangePaddingTop] = React.useState(0);
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
                navigator.geolocation = require('@react-native-community/geolocation');
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
    const onSelectLocation = () => {
        navigation.navigate('Add Location', { 'location': location });
    }
    React.useEffect(() => {
        onRegionChange(location);
    });
    const mapView = React.createRef();
    const lastLocation = React.useRef(location);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: paddingTop }}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={[styles.map, { paddingTop: paddingTop }]}
                initialRegion={location}
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
                <Marker
                    draggable
                    coordinate={location}
                    title={'Địa danh được chọn'}
                    description={JSON.stringify(location)}
                />
            </MapView>
            <View style={{ width: "85%", marginTop: 15 }}>
                <ButtonModel label="CHỌN ĐỊA ĐIỂM NÀY" onPress={onSelectLocation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '80%',
        height: '80%',
        marginTop: 1,
        marginBottom: 1,
        paddingTop: 0,
        borderBottomLeftRadius: 20
    },
});