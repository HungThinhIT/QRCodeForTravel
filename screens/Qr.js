import React from "react";
import { Text, View, Image, StyleSheet, Button, Alert } from "react-native";

export default function Qr() {
    return (
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={styles.qrcode}>
                        <Text>123</Text>
                    </View>
                </View>
            </View>
    );
}
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#0A7FD9', 
        height: '100%', 
        flexDirection: 'column' 
    },
    container2:{ flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', width: '80%',
        marginBottom: '20%', marginTop: '20%', 
        borderTopLeftRadius: 20, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        borderTopRightRadius: 20,
        backgroundColor: '#fff' 
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    qrcode:{
        backgroundColor:"#f20",
    }
    
});