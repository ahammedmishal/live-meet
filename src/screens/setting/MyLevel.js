import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import AppColors from '../../assets/colors/AppColors'
import Header from '../../components/headers/Header'
import Icon, {Icons} from '../../assets/styles/Icons'
import CustomStatusBar from '../../components/customStatusbar/CustomStatusBar'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle'
import InfoBadge from '../../components/infoBadge/InfoBadge'
import LevelRules from '../../components/levelRules/LevelRules'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../loader/Loader";
import {StackActions} from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import VideoModal from "../../components/modals/VideoModal";

const MyLevel = (props) => {

    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
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
            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadUserInfo();
    }, [])

    return (<>
        <Loader isLoading={isLoading}/>
        <ScrollView style={{backgroundColor: AppColors.blackBlue, flex: 1}}>
            <CustomStatusBar/>
            <View style={{
                flexDirection: 'row',
                paddingTop: hp('5'),
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp('6')
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name={'chevron-left'} type={Icons.Feather} size={wp('9')} color={AppColors.white}/>
                </TouchableOpacity>
                <Text style={{
                    fontFamily: FontStyle.semiBoldFont,
                    fontSize: wp('6'),
                    color: AppColors.white, // marginLeft:wp('24')
                }}>MyLevel</Text>
                <TouchableOpacity>

                    <Icon name={''} type={''} size={wp('9')} color={''}/>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{uri : videoModalAvatar}} style={{
                    height: hp('13'),
                    width: hp('13'),
                    marginTop: hp('7'),
                    borderRadius: 100,
                    alignSelf: 'center',
                    marginRight: wp('4')
                }}/>
                <View style={{width: wp('16'), alignSelf: 'center', marginTop: hp('0.3')}}>
                    <InfoBadge text='Lv 0' iconName={'crown'} iconSize={wp('4.3')} iconType={Icons.FontAwesome6}
                               bgColor={AppColors.grey}/>
                </View>
                <View style={{width: wp('14'), alignSelf: 'center', marginTop: hp('1.5')}}>
                    <InfoBadge text='0' iconName={'diamond-sharp'} iconSize={wp('4.3')} iconType={Icons.Ionicons}
                               bgColor={AppColors.yellow}/>
                </View>
                <Text style={{color: AppColors.white, fontFamily: FontStyle.semiBoldFont, marginVertical: hp('2')}}>Top
                    up more to<Text style={{color: AppColors.yellow, fontFamily: FontStyle.semiBoldFont}}> 6000
                        gems </Text> level up</Text>
            </View>
            <View style={{
                backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 20,
            }}>
                <Image source={require('../../assets/images/level.png')}
                       style={{
                           width: "100%", height: 500, objectFit: "fill",
                       }}
                />
            </View>

        </ScrollView>
        <View style={{
            position: "absolute", bottom: 30, alignItems: "center",
            width: "100%",
        }}>
            <TouchableOpacity onPress={() => setVideoModal(true)}>
                <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={[AppColors.pink, AppColors.darkViolet,]}
                    style={{
                        // backgroundColor: AppColors.blue,
                        height: hp('6'),
                        width: wp('70'),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: wp('6'),
                    }}>

                    <Text
                        style={{color: AppColors.white, fontFamily: FontStyle.boldFont}}>TopUp Now</Text>

                </LinearGradient>
            </TouchableOpacity>
        </View>
        <VideoModal navigation={props.navigation} avatar={videoModalAvatar} isVisible={videoModal}
                    setIsVisible={setVideoModal}/>
    </>)
}

export default MyLevel

const styles = StyleSheet.create({})