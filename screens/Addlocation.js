import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Button, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { LabelInputText, } from '../components';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { SliderBox } from "react-native-image-slider-box";

export default function AddLocation({ navigation, route }) {
    const [selectedValue, setSelectedValue] = useState("java");
    const [photo, setPhoto] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [location, setLocation] = useState(null);
    setLocation(route.params.location ? route.params.location : null);
    const stringLocation = location !== null ? location.latitude + " " + location.longtitude : "";

    const onSelectetImage = () => {
        const options = {};
        const tempArrayImage = [];
        // ImagePicker.launchImageLibrary(options, response => {
        //     if (response.uri) {
        //         setPhoto(response);
        //     }
        // });
        ImagePicker.openPicker({
            multiple: true,// To support multiple image selection
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        }).then(image => {
            for (var i = 0; i < image.length; i++) {
                var uri = image[i].path;
                tempArrayImage.push(uri)//image[i].data=>base64 string
            }
            setImageArray(tempArrayImage);
            console.log(JSON.stringify(imageArray));
        });

    }
    const onSelectMap = () => {
        navigation.navigate('Map');
    }
    return (
        <KeyboardAwareScrollView>
            <View style={styles.firstPart}>
                <View style={styles.centerPart}>
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
                            <LabelInputText initText="Khu nghỉ dưỡng" label="Tiêu đề" />
                        </View>


                        <View style={{ marginTop: 10, width: 250 }}>
                            <LabelInputText initText="Bà Nà Hills" label="Tên địa danh" />
                        </View>
                        <View style={[styles.container,
                        {
                            flexDirection: "row",
                            alignContent: "space-between",
                        },]}>
                            <View style={styles.container2}>
                                <View style={styles.nd1}>
                                    <TouchableOpacity onPress={onSelectMap}>
                                        <LabelInputText initText="Núi Bà Nà" label="Địa chỉ" editable={false} />
                                    </TouchableOpacity>
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
                        <View style={{ marginTop: 10, width: 250 }}>
                            <LabelInputText initText="địa chỉ du lịch thu hút nhiều du khách hằng năm" label="Chi tiết" />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                style={{
                                    width: 200
                                }}
                                color="#05B5B3"
                                title="Gửi"
                                onPress={() => Alert.alert('Nhập thành công')}
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