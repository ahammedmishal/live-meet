import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid} from 'react-native'
import React, {useEffect, useState} from 'react'
import GradientContainer from '../../components/gradients/GradientContainer'
import Icon, {Icons} from '../../assets/styles/Icons'
import FontStyle from '../../assets/styles/FontStyle'
import AppColors from '../../assets/colors/AppColors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import SettingViews from '../../components/settingView/SettingViews'
import InfoBadge from '../../components/infoBadge/InfoBadge'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../loader/Loader";
import VideoModal from "../../components/modals/VideoModal";

const Profile = ({navigation}) => {
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

    return (
        <>
            <Loader isLoading={isLoading}/>
            <GradientContainer>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile', {data: userInfo})}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        marginVertical: hp('8'),
                        marginHorizontal: wp('5')
                    }}>
                    <Text style={{
                        color: AppColors.white,
                        fontFamily: FontStyle.regularFont,
                        fontSize: wp('5')
                    }}>Profile</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginBottom: hp('-10')}}>
                    <Image source={{uri: userInfo.photo}} style={{
                        height: hp('10'),
                        width: hp('10'),
                        borderRadius: 100,
                        borderWidth: wp('0.5'),
                        borderColor: AppColors.white,
                        marginRight: wp('4')
                    }}/>
                    <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{
                            fontFamily: FontStyle.mediumFont,
                            fontSize: wp('4.8'),
                            color: AppColors.white
                        }}>{userInfo.name}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <InfoBadge text={userInfo.age}
                                       iconName={userInfo.gender.toLowerCase() === "male" ? 'gender-male' : 'gender-female'}
                                       iconSize={wp('4.3')}
                                       iconType={Icons.MaterialCommunityIcons} bgColor={AppColors.pink}/>
                            <InfoBadge text='Lv1' iconName={'crown'} iconSize={wp('4.3')} iconType={Icons.FontAwesome6}
                                       bgColor={'#999'}/>
                            <InfoBadge text={`ID ${userInfo.id}`} iconName={''} iconSize={wp('4.3')} iconType={''}
                                       bgColor={'transparent'}/>
                            <InfoBadge text={userInfo.location} iconName={'location-sharp'} iconSize={wp('4.3')}
                                       iconType={Icons.Ionicons} bgColor={'transparent'}/>
                        </View>
                    </View>
                </View>
            </GradientContainer>
            <View style={{
                backgroundColor: AppColors.white,
                height: hp('60'),
                borderTopLeftRadius: wp('8'),
                borderTopRightRadius: wp('8')
            }}>
                <ScrollView>

                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: wp('22'),
                        paddingVertical: hp('3.5'),
                        width: wp('100'),
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: FontStyle.mediumFont, color: AppColors.black, fontSize: wp('8')}}>0
                            </Text>
                            <Text style={{
                                fontFamily: FontStyle.regularFont,
                                color: 'rgb(128,128,128)',
                                fontSize: wp('4')
                            }}>I Like</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: FontStyle.mediumFont, color: AppColors.black, fontSize: wp('8')}}>0
                            </Text>
                            <Text style={{
                                fontFamily: FontStyle.regularFont,
                                color: 'rgb(128,128,128)',
                                fontSize: wp('4')
                            }}>Like Me</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: wp('3'),
                        marginHorizontal: wp('4'),
                        paddingHorizontal: wp('4'),
                        paddingVertical: hp('2'),
                        backgroundColor: AppColors.peachpuff
                    }}>
                        <Icons.Ionicons name='diamond-sharp' size={wp('7')}
                                        style={{color: AppColors.yellow, marginTop: hp('0.2')}}/>
                        <Text style={{
                            fontFamily: FontStyle.mediumFont,
                            marginLeft: wp('2'),
                            fontSize: wp('5'),
                            color: AppColors.black
                        }}>My Gems: {userInfo.gems}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: AppColors.white,
                            flexDirection: 'row',
                            position: 'absolute',
                            right: wp('4'),
                            top: hp('2'),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: wp('4'),
                            paddingVertical: hp('0.5'),
                            borderRadius: wp('5'),
                        }} onPress={() => setVideoModal(true)}>
                            <Text style={{
                                fontFamily: FontStyle.mediumFont,
                                fontSize: wp('3.7'),
                                marginRight: wp('2'),
                                color: AppColors.black
                            }}>Buy</Text>
                            <Icons.FontAwesome color={AppColors.black} name='chevron-right'
                                               style={{marginTop: hp('0.2')}}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.container(AppColors.black)]}
                                      onPress={() => setVideoModal(true)}>
                        <Icon name={'crown'} type={Icons.FontAwesome6} color={AppColors.yellow}/>
                        <Text style={styles.text(AppColors.yellow)}>{'Become VIP'}</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Text style={styles.subText(AppColors.grey)}>{'Not joined yet'}</Text>
                            <Icons.FontAwesome
                                name="chevron-right"
                                color={AppColors.white}
                                style={styles.iconStyle}
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.yellow}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.yellow}*/}
                    {/*              iconColor2={AppColors.white} bgColor={AppColors.black} text={'Become VIP'}*/}
                    {/*              subText={'Not joined yet'} iconName={'crown'} iconType={Icons.FontAwesome6}/>*/}
                    {/*<SettingViews navigation={navigation} navigateTo={'MyBag'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.black}*/}
                    {/*              iconColor2={AppColors.black} bgColor={AppColors.white} text={'My Bag'} subText={''}*/}
                    {/*              iconName={'shopping-outline'} iconType={Icons.MaterialCommunityIcons}/>*/}
                    <SettingViews navigation={navigation} navigateTo={'CoinCenter'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.black}
                                  iconColor2={AppColors.black} bgColor={AppColors.white} text={'Coins Center'}
                                  subText={''} iconName={'sack-dollar'} iconType={Icons.FontAwesome6}/>
                    <SettingViews navigation={navigation} navigateTo={'MyLevel'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.black}
                                  iconColor2={AppColors.black} bgColor={AppColors.white} text={'My Level'}
                                  subText={'Lv 0'} iconName={'shield-star-outline'}
                                  iconType={Icons.MaterialCommunityIcons}/>
                    {/*<SettingViews navigation={navigation} navigateTo={'Reward'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.black}*/}
                    {/*              iconColor2={AppColors.black} bgColor={AppColors.white} text={'Invitation Rewards'}*/}
                    {/*              subText={''} iconName={'checkbox-marked-circle-outline'}*/}
                    {/*              iconType={Icons.MaterialCommunityIcons}/>*/}
                    <SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.black}
                                  iconColor2={AppColors.black} bgColor={AppColors.white} text={'Settings'} subText={''}
                                  iconName={'setting'} iconType={Icons.AntDesign}/>
                    <SettingViews navigation={navigation} navigateTo={'FeedBack'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.black}
                                  iconColor2={AppColors.black} bgColor={AppColors.white} text={'Feedback'} subText={''}
                                  iconName={'mail'} iconType={Icons.Feather}/>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => ToastAndroid.show("Livmeetup is alread updated.", ToastAndroid.SHORT)}>
                        <Icon name={'arrow-down-circle'} type={Icons.Feather} color={AppColors.black}/>
                        <Text style={styles.text(AppColors.black)}>{'Update'}</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Text style={styles.subText(AppColors.grey)}>{''}</Text>
                            <Icons.FontAwesome
                                name="chevron-right"
                                color={AppColors.black}
                                style={styles.iconStyle}
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.black}*/}
                    {/*              iconColor2={AppColors.black} bgColor={AppColors.white} text={'Update'} subText={''}*/}
                    {/*              iconName={'arrow-down-circle'} iconType={Icons.Feather}/>*/}
                </ScrollView>
            </View>
            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: bg => ({
        backgroundColor: bg,
        marginTop: hp('1.5'),
        flexDirection: 'row',
        borderRadius: wp('3'),
        marginHorizontal: wp('4'),
        paddingHorizontal: wp('4'),
        paddingVertical: hp('2'),
    }),
    text: cl => ({
        fontFamily: FontStyle.mediumFont,
        fontSize: wp('5'),
        color: cl,
        marginLeft: wp('2')
    }),
    touchableStyle: {
        flexDirection: 'row',
        position: 'absolute',
        right: wp('1'),
        top: hp('2'),
        paddingHorizontal: wp('4'),
        paddingVertical: hp('0.5'),
    },
    subText: cl => ({
        fontFamily: FontStyle.mediumFont,
        color: cl,
        fontSize: wp('3.7'),
        marginRight: wp('2'),
    }),
    iconStyle: {marginTop: hp('0.6')},
});