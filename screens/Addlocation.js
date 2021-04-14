import React from 'react';
import { Text, View, Image, StyleSheet, Button, Alert } from 'react-native';
import { LabelInputText, LabelPicker } from '../components';

export default function AddLocation() {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A7FD9', height: '100%', flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', marginBottom: '40%', marginTop: '40%', borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff' }}>
                <View style={styles.space}>

                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ marginTop: 10, width: 250 }}>
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
                            
                        <LabelInputText initText="Bà Nà Hills" label="Tên địa danh" />
                        <LabelInputText initText="Bà Nà Hills" label="Tên địa danh" />
                    </View>
                    <View style={{ marginTop: 10, width: 250 }}>
                        <LabelInputText initText="địa chỉ du lịch thu hút nhiều du khách hằng năm" label="Chi tiết" />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            style={{ width: 200       
                            }}
                            color="#05B5B3"
                            title="Gửi"
                            onPress={() => Alert.alert('Nhập thành công')}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
   
   
    space: {
        marginTop: 10
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
});