import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MapPicker from "../screens/MapPicker";
import AddLocation from "../screens/Addlocation";

const Tab = createStackNavigator();

export default function AddLocationScreen() {
    return (
        <Tab.Navigator initialRouteName="Map">
            <Tab.Screen name="Add Location" component={AddLocation} />
            <Tab.Screen name="Map" component={MapPicker} />
        </Tab.Navigator>
    );
}