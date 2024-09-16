import {StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/headers/Header';
import FontStyle from '../../assets/styles/FontStyle';
import AppColors from '../../assets/colors/AppColors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icons} from '../../assets/styles/Icons';
import GradientLongButton from '../../components/gradients/GradientLongButton';


const FeedBack = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} scrnName={'Feedback'} leftIconClr={AppColors.black}
                    rightIconClr={AppColors.white} iconName={'setting'} iconType={Icons.AntDesign}/>
            <View style={styles.mainView}>
                <View style={{flexDirection: 'row'}}>

                    <Text style={styles.heading}>Please describe your problem details</Text>
                    <Text style={styles.reqText}>*</Text>
                </View>
                <TextInput placeholder='Enter your issue details' multiline={true}
                           style={[styles.inputStyle(hp('8')), {}]}/>
                <Text style={styles.heading}>Please upload an image</Text>
                <View style={[styles.inputStyle(hp('13')), {justifyContent: 'center',}]}>
                    <TouchableOpacity style={{
                        height: hp('11'),
                        width: hp('10'),
                        backgroundColor: AppColors.grey,
                        borderRadius: wp('2'),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icons.FontAwesome name='plus' color={AppColors.white} size={wp('8')}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.heading}>Please enter your email or phone number</Text>
                <TextInput placeholder='Please enter your email or phone number details' multiline={true}
                           style={styles.inputStyle(hp('11'))}/>
                <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: hp('5')}}>

                    <GradientLongButton title={'Submit'} navigation={navigation} navigateTo={''} onPress={() => {
                        ToastAndroid.show("Thanks for your feedback. Our support team will reach you soon.", ToastAndroid.SHORT);
                    }}/>
                </View>
            </View>

        </View>
    );
};

export default FeedBack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingVertical: hp('6'),
    },
    heading: {
        fontFamily: FontStyle.semiBoldFont,
        color: AppColors.black,
        fontSize: wp('4'),
        marginVertical: hp('1'),
        // paddingLeft:wp('3')
    },
    reqText: {
        color: 'red'
    },
    mainView: {
        // justifyContent:'center',
        // alignItems:'center',
        paddingHorizontal: wp('6'),
        paddingVertical: hp('4')

    },
    inputStyle: ht => ({
        width: wp('89'),
        height: ht,
        borderRadius: wp('2'),
        borderColor: AppColors.grey,
        borderWidth: wp('0.4'),
        paddingHorizontal: wp('3'),
        fontFamily: FontStyle.regularFont
    })
});
