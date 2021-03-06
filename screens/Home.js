import React, { Component } from "react";
import { Image, Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions, TextInput, ImageBackground, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from "../firebase/firebase";
import Star from 'react-native-star-view';
import { createIconSetFromFontello } from "react-native-vector-icons";

// StatusBar.setHidden(true);StatusBar,

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const imgs = 'https://reactnative.dev/img/tiny_logo.png';
const categories = [
    { id: 1, name: 'Asia Park – Sunworld Đà Nẵng Wonders', add: 'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg' },
    { id: 2, name: 'Suối khoáng Thần Tài', add: 'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg' },
    { id: 3, name: 'Biển An Bàng', add: 'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg' },
    { id: 4, name: 'Vinpearl Nam Hội An', add: 'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg' },
    { id: 5, name: 'Công viên văn hóa Ấn Tượng Hội An', add: 'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png' },
    { id: 6, name: 'Asia Park – Sunworld Đà Nẵng Wonders', add: 'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg' },
    { id: 7, name: 'Suối khoáng Thần Tài', add: 'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg' },
    { id: 8, name: 'Biển An Bàng', add: 'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg' },
    { id: 9, name: 'Vinpearl Nam Hội An', add: 'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg' },
    { id: 10, name: 'Công viên văn hóa Ấn Tượng Hội An', add: 'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng', img: 'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png' }
];

const navigateHome = (navigation, screen) => {
    navigation.navigate(navigation, screen)
}

const Item = ({ name, img, add, navigation, screen }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => navigateHome(navigation, screen)}
    >
        <Image source={{ uri: img }}
            style={styles.Catimg}
        />
        <View style={styles.cont}>
            <Text style={styles.nameqr}>{name}</Text>
            <Text style={styles.nameadd}>{add}</Text>
        </View>
    </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {

    const [search, setSearch] = React.useState("")
    const [location, setLocation] = React.useState([])
    const [post, setPost] = React.useState([])

    const loadData = async () => {
        // const user = await auth.currentUser;
        const locationList = []
        const postList = []
        console.log("Get data!")
        try {
            console.log("Here");

            const locationCollectionRef = firestore().collection('location');
            const postCollectionRef = firestore().collection('posts');

            locationCollectionRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    locationList.push({
                        ...location,
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setLocation([...locationList]);
            });

            postCollectionRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    postList.push({
                        ...location,
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setPost([...postList]);
            });

            // console.log("Posts: ", post)
        } catch (error) {
            console.log("BUG IN HERE");
            console.log(error)
        }

    }

    React.useEffect(() => {
        // getData()
        loadData();
        // console.log(location);
    }, [])

    return (
        <SafeAreaView style={styles.wrapAll}>
            <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.qrtr}>QR Travel</Text>
                    <Text style={styles.add} onPress={() => navigation.navigate('Map')}>+</Text>
                </View>

                <View style={styles.searchContainer}>
                    {/* FIXME: Replace with another fonts */}
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
                            navigation.navigate('Search', {
                                keyword: search
                            })
                        }}
                        style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', paddingRight: 5, fontWeight: 'bold' }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Các địa điểm yêu thích</Text>
                        <Text style={styles.seeMore}>Xem thêm</Text>
                    </View>
                    <View >
                        <FlatList
                            data={post}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ paddingRight: 10 }}
                                    onPress={() => navigation.navigate('trending', {
                                        id: item.id, name: item.city
                                    })}
                                >
                                    <ImageBackground
                                        source={{ uri: item.image }}
                                        style={{ width: 100, height: 130, }}
                                        imageStyle={{
                                            borderRadius: 10
                                        }}>
                                        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>{item.city}</Text>
                                        </View>
                                    </ImageBackground>

                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Địa điểm mới</Text>
                        <Text style={styles.seeMore}>Xem thêm</Text>
                    </View>
                    <View >
                        <FlatList
                            data={location}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ paddingRight: 10 }}
                                    onPress={() => navigation.navigate('DetailLocation', {
                                        id: item.id,
                                    })}
                                >
                                    <View style={{
                                        // width: 274,
                                        // height: 222,
                                        borderRadius: 10,
                                        padding: 0,
                                        borderWidth: 1,
                                        borderColor: "#0A7FD9"
                                    }}>

                                        <Image

                                            source={{ uri: item.thumbnail }}
                                            style={{
                                                width: 270,
                                                height: 180,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10
                                            }}
                                        />
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontWeight: "bold", color: "#0A7FD9", fontSize: 20, paddingVertical: 5 }}>{item.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Danh sách các địa điểm</Text>
                        <Text style={styles.seeMore}>Xem thêm</Text>
                    </View>
                    <FlatList
                        style={styles.listView}
                        data={location}
                        // renderItem={renderItem}
                        renderItem={({ item }) => (
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
                                    <View style={{ flexDirection: 'row', alignItems: "center", alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Star score={item.rating} style={styles.starStyle} />
                                            <Text>{item.rating}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, justifyContent: "center" }}>
                                                <Icon style={{}} name="eye" size={15} color="black" />
                                                <Text style={{ paddingLeft: 3, fontSize: 11 }}>999</Text>
                                            </View>

                                            <View style={{}}>
                                                {/* <Icon style={{}} name="heart" size={18} color="red" /> */}
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapAll: {
        backgroundColor: "#FFF"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android
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
        height: 88,
        borderRadius: 10,
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
        paddingHorizontal: 5,
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
        marginBottom: 5,
        marginLeft: 10
    },
});