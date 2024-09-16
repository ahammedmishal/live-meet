import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon, {Icons} from '../../assets/styles/Icons';
import AppColors from '../../assets/colors/AppColors';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontStyle from '../../assets/styles/FontStyle';
import VideoModal from "../../components/modals/VideoModal";

const Chat = (props) => {
    const {item} = props.route.params;
    const navigation = props.navigation;
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    useEffect(() => {
        setVideoModalAvatar(item.avatar);
    }, []);
    return (
        <>
            <View style={styles.container}>
                {/* <Header navigation={navigation} scrnName={'User name'} leftIconClr={AppColors.black} rightIconClr={AppColors.black} iconName={'dots-vertical'} iconType={Icons.MaterialCommunityIcons}/> */}

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name={'chevron-left'}
                            type={Icons.Feather}
                            color={AppColors.black}
                        />
                    </TouchableOpacity>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={{uri: item.avatar}}
                               style={{height: hp('6'), width: hp('6'), borderRadius: 100, marginRight: wp('2')}}/>
                        <Text style={styles.nameStyle}>{item.name}</Text>
                    </View>

                    <Icon
                        name={'dots-vertical'}
                        type={Icons.MaterialCommunityIcons}
                        color={AppColors.black}
                    />
                </View>
                {
                    item.message ?
                        <View style={{
                            height: hp('5'),
                            width: wp('50'),
                            paddingHorizontal: wp('2'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            marginHorizontal: wp('3'),
                            marginVertical: hp('2'),
                            backgroundColor: AppColors.pink,
                            borderRadius: 100
                        }}>
                            <Text
                                style={{color: AppColors.white, fontFamily: FontStyle.mediumFont}}>{item.message}</Text>
                        </View> : null
                }

                {
                    item.reply ?
                        JSON.parse(item.reply).map((r, index) => {
                            return (
                                <View style={{
                                    height: hp('5'),
                                    // width: wp(''),
                                    paddingHorizontal: wp('2'),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'flex-start',
                                    marginHorizontal: wp('3'),
                                    marginVertical: hp('1'),
                                    backgroundColor: AppColors.grey,
                                    borderRadius: 100
                                }}>
                                    <Text
                                        style={{
                                            color: AppColors.black,
                                            fontFamily: FontStyle.mediumFont
                                        }}>{r}</Text>
                                </View>
                            )
                        })
                        : null
                }
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.lockStyle}>
                        <Icons.Fontisto name='locked' size={wp('8')} color={AppColors.yellow} style={{}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => setVideoModal(true)}>
                        <Text style={styles.touchableText}>
                            Reply and ask for contact details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>
        </>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('2'),
        paddingTop: hp('5'),
        paddingBottom: hp('2'),
        backgroundColor: AppColors.white
    }, nameStyle: {
        color: AppColors.black, fontFamily: FontStyle.mediumFont, fontSize: wp('5')
    }, bottomView: {
        position: 'absolute',
        bottom: 0,
        height: hp('18'),
        width: wp('100'),
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }, lockStyle: {
        height: hp('8'),
        width: hp('8'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: AppColors.grey,
        position: 'absolute',
        top: hp('-3')
    }, touchableStyle: {
        backgroundColor: AppColors.darkViolet,
        borderRadius: wp('5'),
        height: hp('5.5'),
        width: wp('73'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('4'),
        marginTop: hp('4')
    }, touchableText: {
        color: AppColors.white, fontFamily: FontStyle.mediumFont
    },
});
