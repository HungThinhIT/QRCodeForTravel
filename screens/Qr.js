import React, { useState } from 'react';
import {SafeAreaView,StyleSheet, View,Text,TouchableOpacity, Button,Alert, Dimensions,Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from "react-native-camera";

import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// console.disableYellowBox = true;

export default function Qr({ navigation,props }) {
    const [scan, setScan] = useState(true);
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

    makeSlideOutTranslation= (translationType, fromValue)=>{
      return {
        from: {
          [translationType]: SCREEN_WIDTH * -0.18
        },
        to: {
          [translationType]: fromValue
        }
      };
    }

    return (
        <View style={styles.container}>
              { result &&
                <View style={styles.result}>
                  <Text style={styles.resultkq}>{result}</Text>
                  <TouchableOpacity onPress={this.startScan}>
                    <View style = {styles.btnStart}>
                        <Text style = {styles.btnStart2}>Quét lại</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                
              }
              {scan &&
              <QRCodeScanner
                showMarker
                onRead={this.onSuccess}
                cameraStyle={{ height: SCREEN_HEIGHT }}
                customMarker={
                  <View style={styles.centerPart}>
                  <View style={styles.rectangleContainer}>
                    <View style={styles.topOverlay}>
                      <Text style={{ fontSize: 18, color: "white" }}>
                        Đặt mã QR Code vào trước máy ảnh để quét!
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.leftAndRightOverlay} />
                        <View style={styles.rectangle}>
                          {/* <Icon
                            name="ios-qr-scanner"
                            size={SCREEN_WIDTH * 0.73}
                            color={iconScanColor}
                          /> */}
                          <Image
                              style={styles.tinyLogo}
                              source={require('../assets/qrcode.png')}
                            />
                          <Animatable.View
                            style={styles.scanBar}
                            direction="alternate-reverse"
                            iterationCount="infinite"
                            duration={1700}
                            easing="linear"
                            animation={this.makeSlideOutTranslation(
                              "translateY",
                              SCREEN_WIDTH * -0.54
                            )}
                          />
                        </View>
                      <View style={styles.leftAndRightOverlay} />
                    </View>
                    <View style={styles.bottomOverlay} />
                  </View>
                  </View>
                }
              />
            }
      </View>
    );
}


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";
const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";
const iconScanColor = "blue";

const styles = {
  centerPart: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: "75%",
    borderRadius: 20,
    backgroundColor: '#fff'
},


  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "transparent",
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    // backgroundColor: overlayColor,
    backgroundColor: '#0A7FD9',
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    // backgroundColor: overlayColor,
    backgroundColor: '#0A7FD9',
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    // backgroundColor: overlayColor
    backgroundColor: '#0A7FD9',
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  container:{
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  result:{
    margin:20,
    height:"100%"
  },
  resultkq:{
    width:"100%",
    fontSize:18,
    marginTop:30
  },
  btnStart:{
    backgroundColor: '#0A7FD9', 
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 20,
    marginTop:30,
    margin:50,
  },
  btnStart2:{
    color: 'white',
    fontSize:18,
    margin:10,
  },
  tinyLogo:{
    width:SCREEN_WIDTH * 0.76,
    height:SCREEN_WIDTH * 0.76,
  }
  
};