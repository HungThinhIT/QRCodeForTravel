import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import Login from "../screens/Login";
import MyTabs from "./Screens";
import Settings from "../screens/Settings";
import MapPicker from "../screens/MapPicker";
import Profile from "../screens/Profile";
import Load from "../screens/Load";
import AddLocation from "../screens/Addlocation";
import DetailLocation from "../screens/DetailLocation";
import TrendingLoca from "../screens/trendingLoca";
import Favorite from "../screens/favorite";

const Tab = createStackNavigator();

export default function MinorScreen() {
    return (
        <Tab.Navigator initialRouteName="Main">
            <Tab.Screen name="Log In" component={Login} options={{headerShown:false}}/>
            <Tab.Screen name="Sign Up" component={SignUp} />
            <Tab.Screen name="Main" component={MyTabs} options={{headerShown:false}} />
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Load" component={Load} options={{headerShown:false}}/>
            <Tab.Screen name="AddLocation" component={AddLocation}/>
            <Tab.Screen name="Map" component={MapPicker}/>
            <Tab.Screen name ="trending" component ={TrendingLoca}/>
            <Tab.Screen name="DetailLocation" component={DetailLocation}/>
            <Tab.Screen name="Favorite" component={Favorite}/>

        </Tab.Navigator>
    );
}