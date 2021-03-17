import React, { Component } from "react";
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import Star from 'react-native-star-view';
//npm install --save react-native-star-view

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
const starStyle = {
    width: 100,
    height: 20,
    marginBottom: 20,
};
export default function Detail() {

    return (

        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View style={{
                flexDirection: "row", marginTop: 30
            }} >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Trang thông tin</Text>
            </View>
            <View style={{
                flexDirection: "row", marginTop: 20
            }} >
                <View style={{ flex: 1, alignItems: "center", }} >
                    <Image
                        style={{
                            alignContent: "center",
                            resizeMode: "cover",
                            height: 100,
                            width: 150
                        }}
                        source={{ uri: 'https://lh3.googleusercontent.com/proxy/MHbKeEbRo-iMupEH5jD91nGnrX2kOWaFX091oOqT_E37aJpHYA01HHe1gwqTu9qk3TuL1naL4WGaCGwzZf23kNgzAfk_zl0ixrOFz1VZeQHNINY-sFvi1wkEaw_9RzQsQRAbZ9KzhZhzE62warMkn2JmaqVw7LOJur4PFrzJrQT_M2KwC2xMV_hfp4a_OVg', }} />
                </View>
                <View style={{ flex: 1, }} >
                    <Text style={{ justifyContent: "center" }}>Cột mốc 108</Text>
                    <Text style={{ justifyContent: "center" }}>Địa chỉ: 108, Xã Trường Hà, Huyện Hà Quảng, Tỉnh Cao Bằng</Text>
                </View>
            </View>
            <View style={{ flex: 1, margin: 10 }} >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Mã QR</Text>
                <View style={{ alignItems: "center", flexDirection: "column", flex: 2 }}>
                    <View style={{ flex: 2, flexDirection: "row" }} ><Star score={4.5} style={starStyle} /><Text style={{ marginStart: 10 }}>4.5/5</Text></View>
                    <Image
                        style={{
                            alignContent: "center",
                            resizeMode: "cover",
                            height: 120,
                            width: 120
                        }}
                        source={{ uri: 'https://webchuyennghiep.info/userfiles/image/qr-code/qr-url-wcn-600.png', }} />
                </View>
            </View>
            <View style={{ flex: 2, margin: 10 }} >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Thông tin</Text>
                <Text>Đây là cột mốc Hồ chủ tịch về nước ngày 28/1/1941 về nước, nơi đây chứa dấu chân Người nơi biên cương Tổ Quốc...</Text>
            </View>
        </View >


    );
};
