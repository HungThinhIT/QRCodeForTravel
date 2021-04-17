import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import Login from "../screens/Login";
import MyTabs from "./Screens";
import Settings from "../screens/Settings";
import MapPicker from "../screens/MapPicker";

const Tab = createStackNavigator();

export default function MinorScreen() {
    return (
        <Tab.Navigator initialRouteName="Log In">
            <Tab.Screen name="Log In" component={Login} />
            <Tab.Screen name="Sign Up" component={SignUp} />
            <Tab.Screen name="Main" component={MyTabs} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}