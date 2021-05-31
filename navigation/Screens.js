import React from "react";
import { Easing, Animated, Dimensions, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';

//Import screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Qr from "../screens/Qr";
import DetailLocation from "../screens/DetailLocation";

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

// export default function MyTabs() {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={Home} />
//             <Tab.Screen name="Profile" component={Profile} />
//             <Tab.Screen name="Settings" component={Settings} />
//         </Tab.Navigator>
//     );
// }

/**
 * Test Screen (Only for testing env)
 */
export default function MyTabs() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'white', color: '#0a7fd9', }}
            tabBarOptions={{
                labelStyle: { color: '#0a7fd9', fontWeight: 'bold',  marginBottom: 5 },
            }}
        >
            <Tab.Screen
                style={{ color: 'white!important' }}
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Khám phá",
                    //FIXME: Refactor with new version
                    tabBarIcon: () => (
                        <Icon name="compass" size={24} color="#0a7fd9" />
                    ),
                }}
            />
            <Tab.Screen
                name="Qr"
                component={Qr}
                options={{
                    tabBarLabel: 'Quét QR',
                    //FIXME: Refactor with new version
                    tabBarIcon: () => (
                        <Icon name="qrcode" size={24} color="#0a7fd9" />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Tài khoản',
                    //FIXME: Refactor with new version
                    tabBarIcon: () => (
                        <Icon name="user-circle" size={24} color="#0a7fd9" />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Cài đặt',
                    //FIXME: Refactor with new version
                    tabBarIcon: () => (
                        <Icon name="gear" size={24} color="#0a7fd9" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}