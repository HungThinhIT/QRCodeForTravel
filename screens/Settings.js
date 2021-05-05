import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { StatusBarBackground } from '../components'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { auth } from "../firebase/firebase";

const menu = [
    { id: 1, title: 'Thay đổi mật khẩu', icon: 'key', screen: 'Home' },
    { id: 2, title: 'Lịch sử tìm kiếm', icon: 'history', screen: 'Home' },
    { id: 3, title: 'Địa điểm yêu thích', icon: 'heart', screen: 'Home' },
    { id: 4, title: 'Cài đặt khác', icon: 'gear', screen: 'Home' },
    { id: 5, title: 'Đăng xuất', icon: 'sign-out', screen: 'Home' },
];

// const signOut = (id, navigation) => {
//     if (id === 6) {
//         auth.signOut().then(() => navigation.navigate('Log In'));
//     }
// }

const navigateSetting = (navigation, screen) => {
    navigation.navigate(screen)
}

const Item = ({ title, icon, navi, screen }) => (
    <TouchableOpacity
        onPress={() => { navigateSetting(navi, screen) }}
        style={styles.itemList}>
        <View style={styles.iconLeft}>
            <Icon name={icon} size={22} color="#0A7FD9" />
        </View>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
);
export default function Settings({ navigation }) {


    function renderUser2() {
        if (1 == 2) // if(user is logged in) 
            return (
                <View style={styles.infoUser}>
                    <Icon name="user-circle" size={22} color="white" />
                    <Text style={styles.infoUserText}>Hưng Thịnh</Text>
                </View>
            );
        return (
            <View style={styles.infoUser}>
                <Icon name="user-circle" size={22} color="white" />
                <Text style={styles.infoUserText}>Bạn chưa đăng nhập</Text>
            </View>
        )
    }


    const renderItem = ({ item }) => (
        <Item title={item.title} icon={item.icon} navi={navigation} screen={item.screen} />
    );

    const listSettings = () => {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    scrollEnabled={false}
                    data={menu}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }

    return (
        <View>
            <StatusBarBackground />
            <View style={styles.container}>
                <View style={styles.backgroundBorder} />
                <View style={styles.contentGroup}>
                    <Text style={styles.headerTitle}>Cài đặt</Text>
                    {renderUser2()}
                    <View style={styles.contentForm}>
                        {listSettings()}
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    backgroundBorder: {
        position: 'absolute',
        backgroundColor: '#0A7FD9',
        top: 0,
        left: 0,
        height: (Dimensions.get('window').height * 0.3),
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    contentGroup: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    infoUser: {
        flexDirection: 'row',
        color: 'white',
        alignItems: 'center',
        marginTop: 5
    },
    infoUserText: {
        fontWeight: '500',
        color: '#FFF',
        marginLeft: 10
    },
    contentForm: {
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    itemList: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#EFF1F5',
        borderBottomWidth: 1,

    },
    iconLeft: {
        borderRadius: 100,
        padding: 10,
        backgroundColor: '#F4F5F9',
        marginRight: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
})