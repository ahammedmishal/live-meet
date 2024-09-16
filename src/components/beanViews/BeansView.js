import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon, {Icons} from '../../assets/styles/Icons'
import AppColors from '../../assets/colors/AppColors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoModal from "../modals/VideoModal";
import {useNavigation} from "@react-navigation/native";

const BeansView = (props) => {
    const navigation = useNavigation();
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: "",
        photo: "https://image.winudf.com/v2/image1/Y29tLkFuaW1lQm95cy5Qcm9maWxlUGljdHVyZXNfaWNvbl8xNjkxODIzMjkwXzAxMA/icon.webp?w=140&fakeurl=1&type=.webp",
        name: "",
        age: "",
        gender: "",
        location: "India",
        level: "1",
        gems: "0",
        coin: "0",
    })

    async function loadUserInfo() {
        try {
            let id = await AsyncStorage.getItem("Id");
            let p = await AsyncStorage.getItem("Avatar");
            let name = await AsyncStorage.getItem("UserName");
            let age = await AsyncStorage.getItem("Age");
            let gender = await AsyncStorage.getItem("Gender");
            let level = await AsyncStorage.getItem("Level");
            let gems = await AsyncStorage.getItem("Gems");
            let coin = await AsyncStorage.getItem("Coins");
            console.log(p);
            setUserInfo({
                id: id,
                photo: p,
                name: name,
                age: age,
                gender: gender,
                level: level,
                gems: gems,
                coin: coin,
                location: "India",
            });
            setVideoModalAvatar(p);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadUserInfo();
    }, [])
    return (
        <>
            <View style={{
                flexDirection: 'row',
                marginVertical: hp('2'),
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp('7')
            }}>
                <View style={{flexDirection: 'row'}}>

                    <Icons.Ionicons name='diamond-sharp' size={wp('6')} color={AppColors.yellow}/>
                    <Text style={{
                        color: AppColors.black,
                        fontFamily: FontStyle.semiBoldFont,
                        marginLeft: wp('2')
                    }}>{props.diamondCount}</Text>
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    paddingHorizontal: wp('3'),
                    paddingVertical: hp('0.3'),
                    backgroundColor: AppColors.pink
                }} onPress={() => setVideoModal(true)}>

                    <Icons.Ionicons name='diamond-sharp' size={wp('5')} color={AppColors.yellow}/>
                    <Text style={{
                        color: AppColors.white,
                        fontFamily: FontStyle.mediumFont,
                        marginLeft: wp('2')
                    }}>{props.beanCount}</Text>
                </TouchableOpacity>
            </View>
            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>
        </>
    )
}

export default BeansView

const styles = StyleSheet.create({})