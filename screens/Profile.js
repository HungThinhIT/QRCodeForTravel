import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { LabelInputText, LabelPicker } from '../components';
const editForm = (props) => {
    return (
        <View style={styles.containerBody}>
            <Text style={styles.titleInfo}>Thông tin của bạn</Text>
            <LabelInputText label={'Họ và Tên'} initText={"Nguyen Hung Thinh"} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 7 }} >
                    <LabelInputText label={'Số điện thoại'} initText={"0836826xxx"} />

                </View>
                <View style={{ flex: 3, paddingLeft: 5 }} >
                    <LabelInputText label={'Giới tính'} initText={"Nam"} />

                </View>
            </View>
            <LabelInputText label={'Địa chỉ'} initText={"87 Nguyen Dinh Hien"} />
            {/* <LabelPicker label="Giới tính"/> */}
        </View>
    );
}

const viewForm = (props) => {
    return (
        <View style={styles.containerBody}>
            <Text style={styles.titleInfo}>Thông tin của bạn</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Họ và Tên</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>Nguyễn Hưng Thịnh</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Số điện thoại</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>0836826xxx</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                <View style={{ flex: 3 }} >
                    <Text>Giới tính</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>Nam</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ flex: 3 }} >
                    <Text>Địa chỉ</Text>
                </View>
                <View style={{ flex: 7 }} >
                    <Text>87 Nguyễn Công Trứ</Text>
                </View>
            </View>
        </View>
    );
}

const hanldeButtonText = (isEditable) =>{
    if(isEditable ){
        return 'Save'
    }
    return 'Edit'
}

export default function Profile() {
    const [isEditable, setIsEditable] = useState(false);
    const [editOrSaveText, setEditOrSaveText] = useState('Edit');
    return (
        <View >
            <TouchableOpacity style={styles.editAndSaveBtn} onPress={() => {
                setIsEditable(!isEditable)
            }
            }>
                <Text>
                    {/* FIXME: Replace with another fonts */}
                    {/* <Feather name="edit" size={24} color="black" /> */}
                 {hanldeButtonText(isEditable)}
                </Text>
            </TouchableOpacity>
            <View style={styles.containerHead}>
                <View style={styles.blockLogo}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/54517258_432923880778905_3408511850269114368_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=e3f864&_nc_ohc=9jTr8j11Zu0AX9NZ_HM&_nc_ht=scontent-hkg4-1.xx&oh=d220fd26f7ee84f6c6e7a2bbecd43ce4&oe=60782651',
                        }}
                    />
                </View>
                <Text style={styles.fullName}>Nguyen Hung Thinh</Text>
                <Text>15 points</Text>
            </View>
            {isEditable == true ? editForm() : viewForm()}
            {/* { editForm()} */}
            {/* // { viewForm()} */}
        </View>
    );
}

const styles = StyleSheet.create({
    editAndSaveBtn: {
        paddingTop: 30,
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        textAlign: 'left'
    },
    containerHead: {
        paddingTop: 20,
        // flexDirection: 'column',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#007AFF',
        borderWidth: 1.5,
    },
    blockLogo: {
        textAlign: 'center',
        // backgroundColor: 'red',
    },
    containerBody: {
        paddingTop: 10,
        paddingHorizontal: 15
    },
    fullName: {
        fontWeight: 'bold',
        fontSize: 20
    },
    titleInfo: {
        // backgroundColor: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        alignItems: 'flex-start',
        textAlign: 'left'
    }
});