import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import AppColors from '../../assets/colors/AppColors'
import CustomStatusBar from '../../components/customStatusbar/CustomStatusBar'
import {Icons} from '../../assets/styles/Icons'
import BeansView from '../../components/beanViews/BeansView'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/headers/Header'
import SettingViews from '../../components/settingView/SettingViews'
import FontStyle from '../../assets/styles/FontStyle'
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoModal from "../../components/modals/VideoModal";


const CoinCenter = (props) => {
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
            <View style={{flex: 1, backgroundColor: AppColors.white, width: wp('100'), paddingVertical: hp('5')}}>
                <CustomStatusBar/>
                <Header navigation={props.navigation} scrnName={'Coins Center'} leftIconClr={AppColors.black}
                        rightIconClr={AppColors.black} />
                <View style={{
                    borderRadius: wp('3'),
                    marginVertical: hp('3'),
                    marginHorizontal: wp('4'),
                    paddingHorizontal: wp('4'),
                    paddingVertical: hp('6'),
                    backgroundColor: AppColors.peachpuff
                }}>
                    <Text style={{
                        fontFamily: FontStyle.mediumFont,
                        marginLeft: wp('2'),
                        fontSize: wp('5'),
                        color: AppColors.black
                    }}>My Coins:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icons.Ionicons name='diamond-sharp' size={wp('7')}
                                        style={{color: AppColors.yellow, marginTop: hp('0.2'), marginLeft: wp('2')}}/>

                        <Text style={{
                            fontFamily: FontStyle.mediumFont,
                            marginLeft: wp('2'),
                            fontSize: wp('5'),
                            color: AppColors.black
                        }}>0</Text>
                        <TouchableOpacity style={{
                            backgroundColor: AppColors.white,
                            flexDirection: 'row',
                            position: 'absolute',
                            right: wp('4'),
                            top: 0,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: wp('4'),
                            paddingVertical: hp('0.5'),
                            borderRadius: wp('5'),
                        }} onPress={() => setVideoModal(true)}>
                            <Text style={{
                                fontFamily: FontStyle.mediumFont,
                                fontSize: wp('3.7'),
                                marginRight: wp('2')
                            }}>Buy Now</Text>
                            <Icons.FontAwesome name='chevron-right' style={{marginTop: hp('0.2')}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{width: wp('100')}}>
                    <Text style={{fontFamily: FontStyle.semiBoldFont, fontSize: wp('4'), paddingHorizontal: wp('5')}}>Convert
                        to gems </Text>
                    <BeansView diamondCount={'100'} beanCount={'10'}/>
                    <BeansView diamondCount={'1000'} beanCount={'100'}/>
                    <BeansView diamondCount={'1000'} beanCount={'1,000'}/>
                    <BeansView diamondCount={'10000'} beanCount={'10,000'}/>
                    {/*<View style={{*/}
                    {/*    // backgroundColor: bg,*/}
                    {/*    marginTop: hp('1.5'),*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    // borderRadius: wp('3'),*/}
                    {/*    marginHorizontal: wp('7'),*/}
                    {/*    // paddingHorizontal: wp('3'),*/}
                    {/*    // paddingVertical: hp('2'),*/}
                    {/*    // justifyContent:'space-between',alignItems:'center'*/}
                    {/*}}>*/}
                    {/*    <Icons.Ionicons*/}
                    {/*        name='diamond-sharp'*/}
                    {/*        color={AppColors.yellow}*/}
                    {/*        size={wp('6')}*/}
                    {/*        style={{marginTop: hp('0.6')}}*/}
                    {/*    />*/}
                    {/*    <Text style={{*/}
                    {/*        fontFamily: FontStyle.mediumFont,*/}
                    {/*        fontSize: wp('4'),*/}
                    {/*        color: AppColors.black,*/}
                    {/*        alignSelf: 'center',*/}
                    {/*        marginLeft: wp('2')*/}
                    {/*    }}>Convert without limit</Text>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={{*/}
                    {/*            position: 'absolute',*/}
                    {/*            right: wp('1'),*/}
                    {/*            top: hp('1'),*/}
                    {/*        }}>*/}
                    {/*        <Icons.FontAwesome*/}
                    {/*            name="chevron-right"*/}
                    {/*            size={wp('4')}*/}
                    {/*            color={AppColors.grey}*/}
                    {/*            style={{marginTop: hp('0.6')}}*/}
                    {/*        />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </View>
            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>
        </>
    )
}

export default CoinCenter

const styles = StyleSheet.create({})