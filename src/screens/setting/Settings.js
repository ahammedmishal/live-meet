import {
    Image,
    ImageBackground, LogBox, Modal, Pressable,
    StyleSheet, Switch,
    Text, ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import AppColors from '../../assets/colors/AppColors';
import Icon, {Icons} from '../../assets/styles/Icons';
import SettingViews from '../../components/settingView/SettingViews';
import Header from '../../components/headers/Header';
import fontStyle from "../../assets/styles/FontStyle";
import GradientLongButton from "../../components/gradients/GradientLongButton";
import {Feather} from "react-native-vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CommonActions, StackActions} from "@react-navigation/native";

LogBox.ignoreAllLogs();
const Settings = ({navigation}) => {
    const [cache, setCache] = useState('13.04 MB')
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <Modal visible={isVisible} animated={true} animationType={'fade'}
                   onDismiss={() => setIsVisible(false)}
                   onRequestClose={() => setIsVisible(false)}
                   transparent={true}
            >
                <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 50,
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        paddingVertical: 30,
                        paddingHorizontal: 20,
                        width: "100%",
                        borderRadius: 10,
                    }}>
                        <Pressable onPress={() => setIsVisible(false)}
                                   style={{
                                       position: "absolute",
                                       right: 10,
                                       top: 10,
                                   }}
                        >
                            <MaterialCommunityIcons name={'close'} size={20}/>
                        </Pressable>
                        <Text
                            style={[{
                                fontFamily: fontStyle.semiBoldFont,
                                textAlign: "center",
                                color: AppColors.black,
                                fontSize: 16,
                                marginTop: 10,
                            }]}>
                            Are you sure to delete your account?
                        </Text>
                        <View style={{justifyContent: "space-between", flexDirection: "row", marginTop: 10,}}>
                            <TouchableOpacity style={{
                                height: hp('6'),
                                width: wp('30'),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: wp('6'),
                                borderWidth: 1,
                                borderColor: AppColors.black,
                            }} onPress={() => setIsVisible(false)}>
                                <Text
                                    style={{color: AppColors.black, fontFamily: FontStyle.boldFont}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async () => {
                                await AsyncStorage.setItem("UserId", "");
                                await AsyncStorage.setItem("Id", "");
                                await AsyncStorage.setItem("UserName", "");
                                await AsyncStorage.setItem("Email", "");
                                await AsyncStorage.setItem("Avatar", "");
                                await AsyncStorage.setItem("Age", "");
                                await AsyncStorage.setItem("Gender", "");
                                await AsyncStorage.setItem("Level", "");
                                await AsyncStorage.setItem("Coins", "");
                                await AsyncStorage.setItem("Gems", "");
                                // navigation.dispatch(StackActions.replace("Splash"));
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'Splash' }],
                                    })
                                );
                            }}>
                                <LinearGradient
                                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                    colors={[AppColors.pink, AppColors.darkViolet,]}
                                    style={{
                                        // backgroundColor: AppColors.blue,
                                        height: hp('6'),
                                        width: wp('30'),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: wp('6'),
                                    }}>

                                    <Text
                                        style={{color: AppColors.white, fontFamily: FontStyle.boldFont}}>Confirm</Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{flex: 1, width: wp('100'), backgroundColor: AppColors.white, paddingVertical: hp('6')}}>
                <Header navigation={navigation} scrnName={'Settings'} leftIconClr={AppColors.black}
                        rightIconClr={AppColors.white} iconName={'setting'} iconType={Icons.AntDesign}/>
                <View style={{marginLeft: wp('-6'),}}>

                    {/*<SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.white} iconColor2={AppColors.grey}*/}
                    {/*              bgColor={AppColors.white} text={'Blocklist'} subText={''} iconName={'crown'}*/}
                    {/*              iconType={Icons.FontAwesome}/>*/}
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => {
                                          ToastAndroid.show("There is nothing in your blacklist.", ToastAndroid.SHORT);
                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Blocklist</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Text style={styles.subText(AppColors.black)}>{''}</Text>
                            <Icons.FontAwesome
                                name="chevron-right"
                                color={AppColors.grey}
                                style={styles.iconStyle}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => {

                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Notification Sound</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Switch value={true}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => {

                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Notification Vibration</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Switch value={true}/>
                        </View>
                    </TouchableOpacity>
                    {/*<SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.white} iconColor2={AppColors.grey}*/}
                    {/*              bgColor={AppColors.white} text={'Notification Vibration'} subText={''}*/}
                    {/*              iconName={'crown'}*/}
                    {/*              iconType={Icons.FontAwesome}/>*/}
                    <SettingViews navigation={navigation} navigateTo={'AboutUs'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.white} iconColor2={AppColors.grey}
                                  bgColor={AppColors.white} text={'About Us'} CsubText={''} iconName={'crown'}
                                  iconType={Icons.FontAwesome}/>
                    <SettingViews navigation={navigation} navigateTo={'PrivacyPolicy'} textColor={AppColors.black}
                                  subTextColor={AppColors.grey} iconColor1={AppColors.white} iconColor2={AppColors.grey}
                                  bgColor={AppColors.white} text={'Privacy Policy'} subText={''} iconName={'crown'}
                                  iconType={Icons.FontAwesome}/>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => {
                                          setCache("0 MB");
                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Clean Cache</Text>
                        <View
                            style={styles.touchableStyle}>
                            <Text style={styles.subText(AppColors.black)}>{cache}</Text>
                            {/*<Icons.FontAwesome*/}
                            {/*    name="chevron-right"*/}
                            {/*    color={AppColors.grey}*/}
                            {/*    style={styles.iconStyle}*/}
                            {/*/>*/}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={() => {
                                          setIsVisible(true)
                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.container(AppColors.white)]}
                                      onPress={async () => {
                                          await AsyncStorage.setItem("UserId", "");
                                          await AsyncStorage.setItem("Id", "");
                                          await AsyncStorage.setItem("UserName", "");
                                          await AsyncStorage.setItem("Email", "");
                                          await AsyncStorage.setItem("Avatar", "");
                                          await AsyncStorage.setItem("Age", "");
                                          await AsyncStorage.setItem("Gender", "");
                                          await AsyncStorage.setItem("Level", "");
                                          await AsyncStorage.setItem("Coins", "");
                                          await AsyncStorage.setItem("Gems", "");
                                          // navigation.dispatch(StackActions.replace("Splash"));
                                          navigation.dispatch(
                                              CommonActions.reset({
                                                  index: 0,
                                                  routes: [{ name: 'Splash' }],
                                              })
                                          );
                                      }}>
                        <Icon name={'crown'} type={Icons.FontAwesome} color={AppColors.white}/>
                        <Text style={styles.text(AppColors.black)}>Logout</Text>
                    </TouchableOpacity>
                    {/*<SettingViews navigation={navigation} navigateTo={'Settings'} textColor={AppColors.black}*/}
                    {/*              subTextColor={AppColors.grey} iconColor1={AppColors.white} iconColor2={AppColors.grey}*/}
                    {/*              bgColor={AppColors.white} text={'Logout'} subText={''} iconName={'crown'}*/}
                    {/*              iconType={Icons.FontAwesome}/>*/}
                </View>

            </View>
        </>
    );
};

export default Settings;

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
