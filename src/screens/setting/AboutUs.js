import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import AppColors from "../../assets/colors/AppColors";
import Header from "../../components/headers/Header";
import {Icons} from "../../assets/styles/Icons";
import React from "react";
import {Image, View, Text} from "react-native";
import fontStyle from "../../assets/styles/FontStyle";

export default function AboutUs({navigation}) {
    return (
        <>
            <View style={{flex: 1, width: wp('100'), backgroundColor: AppColors.white, paddingVertical: hp('6')}}>
                <Header navigation={navigation} scrnName={'About Us'} leftIconClr={AppColors.black}/>
                <View style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Image source={require('../../assets/images/splash.png')}
                           style={{
                               width: 110,
                               height: 110,
                           }}
                    />
                    <Text style={[{
                        fontFamily: fontStyle.boldFont,
                        fontSize: 18,
                        color: AppColors.black,
                        marginTop: 8,
                    }]}>Livmeetup</Text>
                    <Text style={[{
                        fontFamily: fontStyle.semiBoldFont,
                        fontSize: 12,
                        color: AppColors.darkViolet,
                    }]}>Version: 0.01.00</Text>
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                    }}>
                        <Text style={{
                            fontFamily: fontStyle.semiBoldFont,
                            fontSize: 12,
                            color: "#777",
                        }}>Copyright &copy; 2024. All rights reserved</Text>
                    </View>
                </View>
            </View>
        </>
    )
}