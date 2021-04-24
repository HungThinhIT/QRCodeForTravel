import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,ScrollView, View,Text, StatusBar,TouchableOpacity, Button,Alert, Dimensions,TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from "react-native-camera";

export default function Qr({ navigation,props }) {
    const [scan, setScan] = useState(false);
    const [result, setResult] = useState();
    const [isFlashOn, setFlashOn] = useState(false);
    
    onSuccess = (e) => {
        setResult(e.data)
        setScan(false)
    }
    startScan = () => {
        setScan(true)
        setResult()
    }

    return (
        <View style={{backgroundColor:"#0A7FD9"}}>
          <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              { result &&
                <View style={{textAlign: 'center',marginHorizontal:30}}>
                  <TouchableOpacity onPress={this.startScan}>
                    <View style = {styles.btnStart}>
                        <Text style = {styles.btnStart2}>Quét lại mã QR Code</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={styles.body}>
                  { result &&
                    <View style={styles.sectionContainer}>
                      <Text style={styles.centerText}>{result}</Text>
                    </View>
                  }
                   {!scan &&
                    <View style={styles.sectionContainer2}>
                      <TouchableOpacity onPress={this.startScan}>
                        <View style = {styles.btnStart}>
                            <Text style = {styles.btnStart2}>Bắt đầu quét</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                  {scan &&
                    <View style={styles.sectionContainer}>
                          <Text style={styles.centerTextSr}>
                              Đặt mã QR Code vào trước máy ảnh để quét!
                          </Text>
                          
                      <QRCodeScanner
                        flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        cameraStyle={{ width:"100%"}}
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { this.scanner = node }}
                        onRead={this.onSuccess}
                        bottomContent={
                          <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                            <Text style={styles.buttonText}>Dừng quét</Text>
                          </TouchableOpacity>
                        }
                      />
                      <TouchableOpacity style={styles.btnFlash1} onPress={() => isFlashOn ? setFlashOn(false) : setFlashOn(true)}>
                        <Text style={styles.btnFlash}>Bật đèn</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </ScrollView>
          </SafeAreaView>
      </View>
    );
}
const styles = StyleSheet.create({
  scrollView: {
    flexDirection:"column",
    backgroundColor:"#0A7FD9",
    height:"100%",
    marginLeft:30,
    marginRight:30,
  },
  body: {
    flexGrow:2,
    flex: 1,
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 2,
  },
  sectionContainer2: {
    backgroundColor:"#0A7FD9",
    marginTop: Dimensions.get('window').height/2,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#fff',
    marginTop:80,
  },
  centerTextSr: {
    flex: 1,
    fontSize: 18,
    padding: 40,
    color: '#fff',
    marginBottom:40,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'red',
  },
  buttonTouchable: {
    padding: 5,
  },
  btnStart:{
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 15,
    marginTop:30,
  },
  btnStart2:{
    color: 'black',
    fontSize:18,
    margin:10
  },
  btnFlash:{
    textAlign: 'right',
    marginRight:38,
    color:"white",
    marginBottom:5,
  }
});