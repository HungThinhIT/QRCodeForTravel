import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from "../navigation/Screens";
const Tab = createStackNavigator();
export default function Load() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Main" component={MyTabs} options={{headerShown:false}} />
            <Tab.Screen name="Load" component={Load}/>
        </Tab.Navigator>
    );
}