import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
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
import GradientCircle from '../../components/gradients/GradientCircle';
import {Icons} from '../../assets/styles/Icons';
import Header from '../../components/headers/Header';
import InfoBadge from '../../components/infoBadge/InfoBadge';

const UserProfile = (props) => {
    const {item} = props.route.params;
    const [tagsArray, setTagsArray] = useState([{tag: "#like"}, {tag: "#like"}, {tag: "#like"}, {tag: "#like"}])
    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={require('../../assets/images/livMetSplash.jpg')}
                style={styles.bgImage}>
                <View style={{position: 'absolute', top: 0, width: wp('100'), paddingTop: hp('5')}}>
                    <Header navigation={props.navigation} scrnName={''} leftIconClr={AppColors.white}
                            rightIconClr={AppColors.white} iconName={'dots-three-horizontal'} iconType={Icons.Entypo}/>
                </View>
                <View style={styles.detailView}>
                    <View style={{flexDirection: 'row', marginBottom: hp('0.5')}}>
                        <Image source={require('../../assets/images/livMetSplash.jpg')}
                               style={{height: hp('8'), width: hp('8'), borderRadius: 100, marginRight: wp('4')}}/>
                        <View>

                            <Text style={{
                                color: AppColors.black,
                                fontFamily: FontStyle.boldFont,
                                fontSize: wp('6')
                            }}>{item.name}</Text>
                            <InfoBadge text='ID 465258' iconName={''} iconSize={wp('5')} iconType={""}
                                       bgColor={AppColors.grey}/>
                        </View>
                        <Text style={{
                            backgroundColor: AppColors.skyBlue,
                            width: wp('14'),
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontFamily: FontStyle.regularFont,
                            fontSize: wp('3'),
                            marginTop: hp('1.5'),
                            marginLeft: wp('2'),
                            color: AppColors.black,
                            height: hp('2.6'),
                            borderRadius: wp('6')
                        }}>Verified</Text>
                        <View style={{position: 'absolute', right: wp('4'), top: hp('1.5')}}>
                            <GradientCircle height={hp('3.5')} width={hp('3.5')} icoType={Icons.FontAwesome5}
                                            iconColor={AppColors.white} iconName={"heart"} iconSize={wp('4.5')}/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <InfoBadge text='Active' iconName={'dot-single'} iconSize={wp('5')} iconType={Icons.Entypo}
                                   bgColor={AppColors.green}/>
                        <InfoBadge text='Lv1' iconName={'crown'} iconSize={wp('4.3')} iconType={Icons.FontAwesome6}
                                   bgColor={AppColors.yellow}/>
                        <InfoBadge text='Punjab' iconName={'location-sharp'} iconSize={wp('4.3')}
                                   iconType={Icons.Ionicons} bgColor={AppColors.gradient2}/>
                        <InfoBadge text='22' iconName={'gender-female'} iconSize={wp('4.3')}
                                   iconType={Icons.MaterialCommunityIcons} bgColor={AppColors.pink}/>
                    </View>

                </View>
            </ImageBackground>
            <ScrollView style={styles.infoView}>
                <Text style={styles.headText}>Self-introduction</Text>
                <Text style={styles.subText}>{}</Text>

                <Text style={styles.headText}>Interest tag</Text>
                {tagsArray.map((el) => {
                    return (
                        <Text style={styles.subText}>{el.name}</Text>
                    )
                })}
                <Text style={styles.subText}>{'#plyhocky'}</Text>
                <Text style={styles.headText}>Speaking language</Text>
                <Text style={styles.subText}>{}</Text>

            </ScrollView>
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.touchableStyle(AppColors.white)}>
                    <Icons.Ionicons name='chatbubble-ellipses' color={AppColors.darkViolet} size={wp('7')}/>
                    <Text style={styles.conversText(AppColors.darkViolet)}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle(AppColors.darkViolet)}>
                    <Icons.FontAwesome name='phone' color={AppColors.white} size={wp('7')}/>
                    <Text style={styles.conversText(AppColors.white)}>Video Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    bgImage: {height: hp('65'), justifyContent: 'center', alignItems: 'center', width: wp('100')},
    detailView: {
        backgroundColor: AppColors.white,
        paddingHorizontal: wp('3'),
        paddingVertical: hp('1'),
        height: hp('14'),
        width: wp('90'),
        borderRadius: wp('2'),
        position: 'absolute',
        bottom: hp('-6'),
        elevation: 0.2
    },
    infoView: {paddingHorizontal: wp('4'), marginTop: hp('8')},
    headText: {
        fontFamily: FontStyle.semiBoldFont,
        fontSize: wp('4.5'),
        color: AppColors.black,
    },
    subText: {
        fontFamily: FontStyle.regularFont
    },
    bottomView: {flexDirection: 'row', width: wp('100'), position: 'absolute', bottom: 0},
    touchableStyle: bg => ({
        width: wp('50'),
        flexDirection: 'row',
        backgroundColor: bg,
        justifyContent: 'space-between',
        paddingHorizontal: wp('10'),
        alignItems: 'center'
    }),
    conversText: cl => ({color: cl, fontFamily: FontStyle.boldFont, paddingVertical: hp('2'), fontSize: wp('4.5')}),
});
  