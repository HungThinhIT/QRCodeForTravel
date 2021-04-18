import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MapPicker from "../screens/MapPicker";
import AddLocation from "../screens/Addlocation";

const Tab = createStackNavigator();

export default function MinorScreen() {
    return (
        <Tab.Navigator initialRouteName="Add Location">
            <Tab.Screen name="Add Location" component={AddLocation} />
            <Tab.Screen name="Map" component={MapPicker} />
        </Tab.Navigator>
    );
}