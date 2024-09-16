import {
    Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import AppColors from '../../assets/colors/AppColors';
import GradientCircle from '../../components/gradients/GradientCircle';
import {Icons} from '../../assets/styles/Icons';
import fontStyle from "../../assets/styles/FontStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import VideoModal from "../../components/modals/VideoModal";

const EditProfile = ({navigation, route}) => {
    const [languages, setLanguages] = useState([])
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    // useEffect(() => {
    //     let lang = route.params.data.language;
    //     lang = lang.split(",");
    //     setLanguages(lang);
    // }, []);

    return (<>
        <View style={{flex: 1}}>
            <ImageBackground
                source={{uri: route.params.data.photo}}
                style={styles.bgImage}>
                <View style={styles.detailView}>
                    <View style={{flexDirection: "row",}}>
                        <Image source={{uri: route.params.data.photo}}
                               style={{height: hp('8'), width: hp('8'), borderRadius: 100, marginRight: wp('4')}}/>
                        <View>
                            <View>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont, color: "#222", fontSize: 15,
                                }}>{route.params.data.name}</Text>
                                {/*<Text style={{*/}
                                {/*    backgroundColor: AppColors.skyBlue,*/}
                                {/*    width: wp('14'),*/}
                                {/*    textAlignVertical: 'center',*/}
                                {/*    textAlign: 'center',*/}
                                {/*    fontFamily: FontStyle.regularFont,*/}
                                {/*    fontSize: wp('3'),*/}
                                {/*    marginTop: hp('1.5'),*/}
                                {/*    marginLeft: wp('2'),*/}
                                {/*    color: AppColors.black,*/}
                                {/*    height: hp('2.6'),*/}
                                {/*    borderRadius: wp('6')*/}
                                {/*}}>Verified</Text>*/}
                                <Text style={{fontFamily: fontStyle.mediumFont}}>ID {route.params.data.id}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 5, flexDirection: "row",}}>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: 0,
                                paddingHorizontal: 6,
                                borderRadius: 50,
                                backgroundColor: "#43E812",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <View style={{
                                width: 8, height: 8, borderRadius: 50, backgroundColor: "#fff", marginRight: 3,
                            }}/>
                            <Text
                                style={{
                                    fontFamily: fontStyle.semiBoldFont, fontSize: 10, color: "#fff"
                                }}>Active</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: 0,
                                paddingHorizontal: 6,
                                borderRadius: 50,
                                backgroundColor: "#999",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 4,
                            }}>
                            <MaterialCommunityIcons name={'heart'} color={'#fff'}/>
                            <Text
                                style={{
                                    fontFamily: fontStyle.semiBoldFont, fontSize: 10, color: "#fff"
                                }}>Lv{route.params.data.level}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: 0,
                                paddingHorizontal: 6,
                                borderRadius: 50,
                                backgroundColor: "#04B114",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 4,
                            }}>
                            <MaterialCommunityIcons name={'map-marker'} color={'#fff'}/>
                            <Text
                                style={{
                                    fontFamily: fontStyle.semiBoldFont, fontSize: 10, color: "#fff"
                                }}>{route.params.data.location}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: 0,
                                paddingHorizontal: 6,
                                borderRadius: 50,
                                backgroundColor: "#FF0000",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 4,
                            }}>
                            <MaterialCommunityIcons name={'gender-female'} color={'#fff'}/>
                            <Text
                                style={{
                                    fontFamily: fontStyle.semiBoldFont, fontSize: 10, color: "#fff"
                                }}>{route.params.data.age}</Text>
                        </View>
                    </View>
                    {/*<View style={{position: 'absolute', right: wp('4'), top: hp('1.5')}}>*/}
                    {/*    <GradientCircle height={hp('3.5')} width={hp('3.5')} icoType={Icons.FontAwesome5}*/}
                    {/*                    iconColor={AppColors.white} iconName={"heart"} iconSize={wp('4.5')}/>*/}
                    {/*</View>*/}
                </View>
            </ImageBackground>
            <View style={styles.infoView}>
                {/*<Text style={[styles.headText, {fontSize: 15}]}>Self-introduction</Text>*/}
                {/*<Text style={styles.subText}>{route.params.data.introduction}</Text>*/}
                {/*<Text style={[styles.headText, {fontSize: 15, marginTop: 10,}]}>Speaking language</Text>*/}
                {/*<View style={{flexDirection: "row", marginTop: 10,}}>*/}
                {/*    {languages.map((l, index) => {*/}
                {/*        return (<View key={index} style={{*/}
                {/*            backgroundColor: "rgba(0,0,0,0.1)",*/}
                {/*            paddingVertical: 5,*/}
                {/*            paddingHorizontal: 10,*/}
                {/*            marginRight: 8,*/}
                {/*            borderRadius: 50,*/}
                {/*        }}>*/}
                {/*            <Text style={{*/}
                {/*                fontFamily: fontStyle.semiBoldFont, fontSize: 13, color: "#222",*/}
                {/*            }}>{l}</Text>*/}
                {/*        </View>)*/}
                {/*    })}*/}
                {/*</View>*/}
            </View>
        </View>
        <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                    setIsVisible={setVideoModal}/>
    </>);
};

export default EditProfile;

const styles = StyleSheet.create({
    bgImage: {height: hp('65'), justifyContent: 'center', alignItems: 'center', width: wp('100')},
    detailView: {
        backgroundColor: AppColors.white,
        paddingHorizontal: wp('3'),
        paddingVertical: hp('1'),
        flexDirection: 'column',
        height: hp('14'),
        width: wp('90'),
        borderRadius: wp('2'),
        position: 'absolute',
        bottom: hp('-6'),
        elevation: 0.2
    },
    infoView: {paddingHorizontal: wp('4'), marginTop: hp('8')},
    headText: {
        fontFamily: FontStyle.semiBoldFont, fontSize: wp('4.5'), color: AppColors.black,
    },
    subText: {
        fontFamily: FontStyle.regularFont
    },
    bottomView: {flexDirection: 'row', width: wp('100'), position: 'absolute', bottom: 0},
    touchableStyle: bg => ({width: wp('50'), backgroundColor: bg, justifyContent: 'center', alignItems: 'center'}),
    conversText: cl => ({color: cl, fontFamily: FontStyle.mediumFont, paddingVertical: hp('2')}),
});
