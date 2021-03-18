import React from "react";
import { Easing, Animated, Dimensions, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Import screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}