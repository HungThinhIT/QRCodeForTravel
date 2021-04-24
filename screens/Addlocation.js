import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Button, Alert, SafeAreaView, TouchableOpacity, Dimensions,TextInput } from 'react-native';
import { LabelInputText, } from '../components';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { SliderBox } from "react-native-image-slider-box";
//import {storage} from "../firebase/firebase";
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import ImgToBase64 from 'react-native-image-base64';

function urlToBlob(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    })
  }
  const { v4: uuid } = require("uuid");
export default function AddLocation({ navigation, route }) {
    const [selectedValue, setSelectedValue] = useState("dn");
    const [photo, setPhoto] = useState([]);
    const [ inputlink, setInputlink] = useState('0');
    const [ height, setHeight] = useState(0);
    const [imageArray, setImageArray] = useState([]);
    const routeLocation = route.params.location ? route.params.location : null;
    const [location, setLocation] = useState(routeLocation);
    const stringLocation = location !== null ? location.latitude + " " + location.longtitude : "";
    const [title, setTitle] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [detail, setDetail] = useState();
    const fs = require('react-native-fs');
    const [uploading, setUploading] = useState(null);
    const [imageName, setImageName] = useState([]);

    const submitLocation = (location,title,selectedValue,address,name,detail) => {
        const latitude = location.latitude;
        const longitude= location.longitude;
        prepareUploadImageToStorage();
        for(var i=0; i <photo.length; i++){
            submitImage(photo[i]);
        }
        //Alert.alert(title+name+address+selectedValue+detail+"Toa do: " +latitude+", "+longitude);
    };
    const testNote = (data)=>{
        var RNFS = require('react-native-fs');
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        console.log(path);
        RNFS.writeFile(path, data, 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err);
        });
        
    }
    const prepareUploadImageToStorage = () =>{
        let app;
        var stCredentials ={
            apiKey: "AIzaSyAcH9iGfbmP1Xzx8j5OB1wNyGTkHoCAvmk",
            appId:"1:138826178666:web:62961ee1ec17c2899faa13",
            authDomain: "qrtravel-vku.firebaseapp.com",
            databaseURL: "https://qrtravel-vku.firebaseio.com",
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
    }

    const submitImage = async (photo)=>{
        setUploading(true);
        try{
            //await storage.ref(`location/${photo.filename}`).putString(photo.data,'base64');
            await storage().ref(`location/${photo.filename}`).putFile(photo.path);
            setUploading(false);
        }catch(e){
            console.log(e);
        }
    }

    const onSelectetImage = () => {
        const options = {};
        const tempArrayImage = [];
        const photos = [];
        const imageGetName = [];
        ImagePicker.openPicker({
            includeBase64: true,
            multiple: true,// To support multiple image selection
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        }).then(image => {
            for (var i = 0; i < image.length; i++) {
                var uri = image[i].path;
                const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                image[i].path= uploadUri;
                image[i].filename = filename;
                tempArrayImage.push(uploadUri);//image[i].data=>base64 string
                photos.push(image[i]);
                imageGetName.push(filename);
            }
            setPhoto(photos);
            setImageArray(tempArrayImage);
            setImageName(imageGetName);
        }).catch((e) => {
            console.log(e);
        });

    }
    return (
        <KeyboardAwareScrollView>
            <View style={styles.firstPart}>
                <View style={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     width: '80%',
                     borderRadius: 20,
                     backgroundColor: '#fff',
                    height: Math.max(2, Dimensions.get("screen").height*65/100+height)
                    }}>
                    <View style={styles.space}>
                        <TouchableOpacity
                            onPress={onSelectetImage}>
                            {imageArray.length > 0 ? (
                                <View style={styles.styleSlide}>
                                    <SliderBox images={imageArray} ImageComponentStyle={styles.styleImage} />
                                </View>
                            ) : (<Image
                                style={styles.styleImage}
                                source={require("../assets/adaptive-icon.png")}
                            />)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row-reverse", width: "100%" }}>
                        <View style={{ flex: 1, marginRight: 10, marginTop: 5 }}><Text style={{ alignSelf: "flex-end", color: "blue" }} onPress={onSelectetImage}>Chọn ảnh...</Text></View>
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={{ width: 250 }}>
                            <LabelInputText initText="Khu nghỉ dưỡng" label="Tiêu đề" onChangeText={title => setTitle(title)}/>
                        </View>


                        <View style={{ marginTop: 10, width: 250 }}>
                            <LabelInputText initText="Bà Nà Hills" label="Tên địa danh" onChangeText={name => setName(name)}/>
                        </View>
                        <View style={[styles.container,
                        {
                            flexDirection: "row",
                            alignContent: "space-between",
                        },]}>
                            <View style={styles.container2}>
                                <View style={styles.nd1}>
                                    <LabelInputText initText="Núi Bà Nà" label="Địa chỉ" onChangeText={address => setAddress(address)}/>
                                </View>
                                <View style={styles.nd2}>
                                    <Text>Thành Phố:</Text>
                                    <SafeAreaView >
                                        <Picker
                                            selectedValue={selectedValue}
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                        >
                                            <Picker.Item label="Đà Nẵng" value="dn" />
                                            <Picker.Item label="Hà Nội" value="hn" />
                                            <Picker.Item label="Hồ Chí Minh" value="hcm" />
                                        </Picker>
                                    </SafeAreaView>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 5, width: 250 }}>
                            {/* <LabelInputText initText="địa chỉ du lịch thu hút nhiều du khách hằng năm" label="Chi tiết" /> */}
                            <Text>Chi tiết:</Text>
                            <TextInput
                                placeholder="Hãy mô tả về địa điểm này"
                                maxLength={200}
                                multiline={true}
                                returnKeyLabel = {"next"}
                                onChangeText={(detail) => {setInputlink(detail); setDetail(detail)}}
                                onContentSizeChange={(event) => {
                                    setHeight(event.nativeEvent.contentSize.height)
                                }}
                                style={[styles.textInputStyle, {
                                    height: Math.max(2, height)
                                }]}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                style={{
                                    width: 200
                                }}
                                color="#05B5B3"
                                title="Gửi"
                                onPress={() => submitLocation(location,title,selectedValue,address,name,detail)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    firstPart: {
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A7FD9',
        flexDirection: 'column'
    },
    centerPart: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: "77%",
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    backgoundContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A7FD9',
        // height: '100%', 
        flexDirection: 'column',
        height: Dimensions.get('window').height,
    },
    styleSlide: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 40 / 100,
    }
    , styleImage: {
        resizeMode: 'cover',
        width: Dimensions.get('window').width * 80 / 100,
        height: Dimensions.get('window').width * 40 / 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    space: {
        marginTop: 0
    },
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container2: {
        flex: 1,
        padding: 2,
        borderRadius: 10,
        flexDirection: 'row'
    },
    nd1: {
        width: 60,
        height: 60,
        flex: 1,
        marginRight: 10,
    },
    nd2: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        flexGrow: 1,
        flex: 2,
    },
});