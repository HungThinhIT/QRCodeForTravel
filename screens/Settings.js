import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const menu = [
    { id: 1, title: 'Hồ sơ', icon: 'person' },
    { id: 2, title: 'Cài đặt', icon: 'settings' },
    { id: 3, title: 'Đã lưu', icon: 'bookmark' },
    { id: 4, title: 'Something', icon: 'settings' },
    { id: 5, title: 'Lịch sử', icon: 'history' },
    { id: 6, title: 'Sự kiện', icon: 'calendar-today' },
];

const Item = ({ title, icon }) => (
    <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Clicked!')}>
        <MaterialIcons name={icon} size={28} style={styles.icon} />
        <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
);

export default function Settings() {
    const renderItem = ({ item }) => (
        <Item title={item.title} icon={item.icon}/>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Setting</Text>
            </View>
            <View style={{}}>
                <FlatList
                    data={menu}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEDF0"
    },
    header: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 10,
        margin: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        elevation: 6
    },
    icon: {
        position: 'absolute',
        left: 8
    },
    itemTitle: {
        left: 10,
    }
})