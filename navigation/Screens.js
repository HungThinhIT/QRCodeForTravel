import React from "react";
import { Easing, Animated, Dimensions, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//Import screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Qr from "../screens/Qr";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'white', color: '#05B5B3' }}
            tabBarOptions={{
                labelStyle: {color: 'white'},
            }}
        >
            <Tab.Screen 
                style={{color: 'white!important'}}
                name="Home" 
                component={Home} 
                options={{
                    tabBarLabel: "Khám phá",
                    tabBarIcon: () => (
                        <Ionicons name="compass" size={24} color="#05B5B3" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Qr" 
                component={Qr} 
                options={{
                    tabBarLabel: 'Quét QR',
                    tabBarIcon: () => (
                        <Ionicons name="qr-code-sharp" size={24} color="#05B5B3" />
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: () => (
                        <Ionicons name="person-circle" size={24} color="#05B5B3" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    tabBarLabel: 'Cài đặt',
                    tabBarIcon: () => (
                        <FontAwesome name="gear" size={24} color="#05B5B3" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}