import { React, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import {auth} from "../firebase/firebase";
import 'react-native-gesture-handler';

const menu = [
    { id: 1, title: 'Hồ sơ', icon: 'person' },
    { id: 2, title: 'Cài đặt', icon: 'settings' },
    { id: 3, title: 'Đã lưu', icon: 'bookmark' },
    { id: 4, title: 'Something', icon: 'settings' },
    { id: 5, title: 'Lịch sử', icon: 'history' },
    { id: 6, title: 'Log Out', icon: 'history' },
];
const signOut = (id,navigation) => {
    if(id === 6){
        auth.signOut().then(()=> navigation.navigate('Log In'));
    }
}

const Item = ({id, title, icon, navigation }) => (
    <TouchableOpacity style={styles.item} onPress={() => signOut(id,navigation)}>
        {/* FIXME: Replace with another fonts */}
        {/* <MaterialIcons name={icon} size={28} style={styles.icon} /> */}
        <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
);

export default function Settings({navigation}) {
    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} icon={item.icon} navigation = {navigation}/>
    );
    const [modalVisible, setModalVisible] = useState(false);

    return (
        // <View style={styles.container}>
        //     <View style={styles.header}>
        //         <Text style={styles.headerTitle}>Setting</Text>
        //     </View>
        //     <View style={{}}>
        //         <FlatList
        //             data={menu}
        //             renderItem={renderItem}
        //             keyExtractor={item => item.id}
        //             numColumns={2}
        //         />
        //     </View>
        // </View>
        <View>
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <View style={{ flex: 8, backgroundColor: "transparent" }}>

                </View>
                <View style={{ flex: 2, backgroundColor: "" }}>
                    <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
                        <View style={styles.item}>
                            <Entypo name="key" size={24} color="#05B5B3" />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome name="sign-out" size={24} color="#05B5B3" />
                        </View>
                        <View style={styles.item}>
                            <FontAwesome5 name="adjust" size={24} color="#05B5B3" />
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
                        <View style={styles.item}>
                            <FontAwesome5 name="history" size={24} color="#05B5B3" />
                        </View>
                        <View style={styles.item}>
                            <AntDesign name="heart" size={24} color="#05B5B3" />
                        </View>
                        <View style={styles.item}>
                            {/* FIXME: Replace with another fonts */}
                            {/* <MaterialCommunityIcons name="hammer-wrench" size={24} color="#05B5B3" /> */}
                        </View>
                    </View>
                </View>
            </View>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            > */}
                {/* <View 
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                    <View
                        style={{ height: '300px'}}
                    ></View>
                </View> */}
                {/* <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View> */}
            {/* </Modal> */}
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