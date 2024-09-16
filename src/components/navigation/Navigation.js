import Splash from "../../screens/splash/Splash";
import PhoneLogin from "../../screens/auth/PhoneLogin";
import Verification from "../../screens/auth/Verification";
import ProfileDetail from "../../screens/dashboard/ProfileDetail";
import Settings from "../../screens/setting/Settings";
import EditProfile from "../../screens/profile/EditProfile";
import Chat from "../../screens/chats/Chat";
import FeedBack from "../../screens/feedback/FeedBack";
import UserProfile from "../../screens/profile/UserProfile";
import CoinCenter from "../../screens/setting/CoinCenter";
import MyBag from "../../screens/setting/MyBag";
import MyLevel from "../../screens/setting/MyLevel";
import Reward from "../../screens/setting/Reward";
import {NavigationContainer} from "@react-navigation/native";
import React, {useContext, useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Icons} from "../../assets/styles/Icons";
import AppColors from "../../assets/colors/AppColors";
import Dashboard from "../../screens/dashboard/Dashboard";
import Conversation from "../../screens/conversations/Conversation";
import Profile from "../../screens/profile/Profile";
import Hot from "../../screens/dashboard/Hot";
import Nearby from "../../screens/dashboard/Nearby";
import Messages from "../../screens/conversations/Messages";
import CallHistory from "../../screens/conversations/CallHistory";
import {UserContext} from "../../screens/context/AuthContext";
import AboutUs from "../../screens/setting/AboutUs";
import PrivacyPolicy from "../../screens/setting/PrivacyPolicy";
import Payments from "../../screens/payments/Payments";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreens = () => {
    return (<Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Dashboard') {
                    iconName = 'heart-pulse';
                } else if (route.name === 'Conversation') {
                    iconName = 'chat-outline';
                } else if (route.name === 'Profile') {
                    iconName = 'account-circle';
                }

                // You can return any component that you like here!
                return (<Icons.MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                />);
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: AppColors.pink,
            tabBarInactiveTintColor: '#555',
            tabBarShowLabel: false,
        })}>
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
        />
        <Tab.Screen
            name="Conversation"
            component={Conversation}
            options={{headerShown: false}}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
        />
    </Tab.Navigator>);
};
const TopTabDashboard = () => {
    return (<TopTab.Navigator>
        <TopTab.Screen
            name="Hot"
            component={Hot}
            options={{headerShown: false}}
        />
        <TopTab.Screen
            name="Nearby"
            component={Nearby}
            options={{headerShown: false}}
        />
    </TopTab.Navigator>);
};
const TopTabConversations = () => {
    return (<TopTab.Navigator
        // style={{width:wp('40'),flex:1}}
    >
        <TopTab.Screen
            name="Messages"
            component={Messages}
            options={{headerShown: false}}
        />
        <TopTab.Screen
            name="CallHistory"
            component={CallHistory}
            options={{headerShown: false}}
        />
    </TopTab.Navigator>);
};
export default function Navigation() {
    const {user} = useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'TabScreens' : 'Login'}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PhoneLogin"
                    component={PhoneLogin}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="TabScreens"
                    component={TabScreens}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ProfileDetail"
                    component={ProfileDetail}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Payments"
                    component={Payments}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="FeedBack"
                    component={FeedBack}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfile}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CoinCenter"
                    component={CoinCenter}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MyBag"
                    component={MyBag}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MyLevel"
                    component={MyLevel}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Reward"
                    component={Reward}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}