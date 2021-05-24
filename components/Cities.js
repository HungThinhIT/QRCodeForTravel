import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { withNavigation } from '@react-navigation/compat';

const cities = (props) => {
    const { onValueChange,selectedValue } = props
    const categories = [
        { id: 1, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
        { id: 2, name:'Suối khoáng Thần Tài',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg'},
        { id: 3, name:'Biển An Bàng',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg'},
        { id: 4, name:'Vinpearl Nam Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg'},
        { id: 5, name:'Công viên văn hóa Ấn Tượng Hội An',add:'Khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png'},
        { id: 6, name:'Asia Park – Sunworld Đà Nẵng Wonders',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/05/kinh-nghiem-du-lich-da-nang-5-265x198.jpeg'},
        { id: 7, name:'Suối khoáng Thần Tài',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2016/11/dia-diem-du-lich-da-nang-a31-696x398.jpg'},
        { id: 8, name:'Biển An Bàng',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/ghe-tham-nhung-bai-bien-dep-cua-mien-trung-tour-du-lich-gia-re-1457609046-696x398.jpg'},
        { id: 9, name:'Vinpearl Nam Hội An',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/08/51-300x171.jpg'},
        { id: 10, name:'Công viên văn hóa Ấn Tượng Hội An',add:'khu du lịch Bà Nà Hills, thôn An Sơn, Xã Hoà Ninh, Huyện Hoà Vang, TP. Đà Nẵng',img:'http://divui.com/blog/wp-content/uploads/2018/10/nhung-trai-nghiem-thu-vi-chi-co-o-cong-vien-an-tuong-hoi-an-2-300x198.png'}
    ];
    
    return (
        <View style={{padding: 10}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Các địa điểm yêu thích</Text>
                <Text style={styles.seeMore}>Xem thêm</Text>
            </View>
            <View >
                <FlatList 
                    data={categories}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={{paddingRight: 10}} 
                            onPress={() => navigation.navigate('trending', {
                                id: item.id, name: item.name
                            })}
                        >
                            <ImageBackground 
                                source={{uri: item.img}}
                                style={{width: 100, height: 130, }}
                                imageStyle={{
                                    borderRadius: 10
                                }}>
                                <View style={{position: 'absolute', left: 0, right: 0, bottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: "white", fontWeight: "bold"}}>TP California</Text>
                                </View>
                            </ImageBackground>
                            
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                />
            </View>
        </View>
    )
}
function itemPicker(cities){
    return cities.map((city, index)=><Picker.Item key={index} label={city} value={city} />);
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
    container: {
        flex: 1,
        alignItems:'center',
        // padding:10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#f20',
        marginBottom: 10,
        flexDirection: 'row',
        
    },
    qrtr:{
        marginLeft:18,
        color:'#0A7FD9',
        fontSize: 22,
    },
    add:{
        color:'#0A7FD9',
        fontSize: 22,
        marginRight:28,
        textAlign: 'right',
        flexGrow:2,
    },
    Catimg:{
        width: 88,
        height: 82,
    },
    header:{
        flexDirection: 'row',
        paddingVertical:15,
        // backgroundColor:"#FFFFFF",
        // borderBottomWidth :1,
        // borderBottomColor: '#000',
    },
    nameqr:{
        marginLeft:10,
        flexGrow:1,
        flex: 1,
        fontSize: 16,
        fontWeight: "bold"
    },
    nameadd:{
        marginLeft:10,
        flexGrow:2,
        flex: 2,
    },
    cont:{
        flexDirection: "column",
        flex: 5,
    },
    listView: {
        paddingHorizontal: 10,
    },
    search: {
        // margin:10,
        // height: 50,
        // borderWidth: 1,
        // borderRadius: 20,
        // paddingHorizontal: 12,
        borderColor: '#0A7FD9',
        borderRadius: 10,
    },
    searchContainer: {
        backgroundColor:"#FFFFFF",
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
    }
});



export default cities;