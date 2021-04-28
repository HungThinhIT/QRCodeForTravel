import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { withNavigation } from '@react-navigation/compat';

const CityPicker = (props) => {
    const { onValueChange,selectedValue } = props
    const cities = ["Đà Nẵng","Hải Phòng","Hà Nội","TP HCM","Cần Thơ","An Giang","Bà Rịa - Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước",
    "Bình Thuận","Cà Mau","Cao Bằng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Tĩnh","Hải Dương","Hậu Giang","Hòa Bình","Hưng Yên","Khánh Hòa",
    "Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh",
    "Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái","Phú Yên"];
    
    return (
        <SafeAreaView style={{ maxHeight:40, justifyContent:"center", padding: 0, marginTop:5 , borderWidth : 1, borderRadius:10 ,borderColor: 'lightgrey', width:120 }}>
            <Picker
                selectedValue={selectedValue}
                style={{color:"#000", marginTop:0,}}
                onValueChange={onValueChange}
                itemStyle={{fontSize:5}}
            >
                {itemPicker(cities)}
            </Picker>
        </SafeAreaView>
    )
}
function itemPicker(cities){
    return cities.map((city)=><Picker.Item  label={city} value={city} />);
};

const styles = StyleSheet.create({
    formInput: {
        marginTop: 10,
    },
    input: {
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
});



export default CityPicker;