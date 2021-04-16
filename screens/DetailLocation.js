import React, { Component } from "react";
import { FlatList, Text, View, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Star from 'react-native-star-view';
//npm install --save react-native-star-view

export default function DetailLocation() {
    return (
        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <View>
                <Text>Back (tmp - replace with react navigation)</Text>                
            </View>
            <View style={styles.map}>
                <Text> Map in here</Text>
            </View>
            <View>
                <SafeAreaView>
                    <ScrollView 
                        style={styles.scrollView} 
                        horizontal={true}>
                        <Image
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
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.information}>
                    <View style={styles.headOption}>
                        <Text style={styles.title} >Asia Park – Sunworld Đà Nẵng Wonders</Text>
                    </View>
                    <View style={styles.detailInformation}>
                        <View style={{ flex: 3, backgroundColor: "darkorange" }} >
                            <View 
                                style={{flexDirection: 'column'}}
                            >
                                <Text style={{fontSize: 12}}>Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1}} >
                            <Image
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/59b2/5a79/aa8cefd1a60e87f9557138ed02943e73?Expires=1619395200&Signature=RNgE2alGlUfmPc7-7LTD28D9Vnu5jSpKBP2ci9WD7Fh5Dxk950GesltQ9KqgEm~BktI3ECwY0P-7EmFGIzhQxWdTiBfH-ag-RXy95goL6gUtztJKIAEzsA5GxHQpIxll1BIgDkvo0RoWHLQE-4yL7z7cqb5QOYHKFCRHy8lzSAH17s9XAYQtV2b085ZRhoKvZ1JWSpR118YA3edju-bZ-gf2TMXkEth8lpBuLjRFqOSvSfMGSfdreyhrVviU-uYzTCxZwJloj3RW-avDLcw0SqEQE5OjU38PaTDZUaNAG11WzjwicKWkjyX2-2DR~0sHmnjPDldJjgzh38naJGTgYQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', }} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </View >


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        padding: 0,
    },
    item: {
        fontSize: 18,
        height: 44,
    },
    map: {
        height: 180,
        backgroundColor: 'red',
    },
    scrollView: {
        backgroundColor: 'white',
        height: '50%',
        padding: 10,
    },
    text: {
        fontSize: 42,
    },
    information: {
        padding: 10,
    },
    headOption:{
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: 'white'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    detailInformation:{
        flexDirection: 'row',
        height: 100,
        paddingHorizontal: 10,
    }
});
const starStyle = {
    width: 100,
    height: 20,
    marginBottom: 20,
};