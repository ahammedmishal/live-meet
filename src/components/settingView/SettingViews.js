import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../../assets/styles/Icons';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SettingViews = (props) => {
    return (
        <TouchableOpacity style={[styles.container(props.bgColor)]}
                          onPress={() => props.navigation.navigate(props.navigateTo)}>
            <Icon name={props.iconName} type={props.iconType} color={props.iconColor1}/>
            <Text style={styles.text(props.textColor)}>{props.text}</Text>
            <View
                style={styles.touchableStyle}>
                <Text style={styles.subText(props.subTextColor)}>{props.subText}</Text>
                <Icons.FontAwesome
                    name="chevron-right"
                    color={props.iconColor2}
                    style={styles.iconStyle}
                />
            </View>
        </TouchableOpacity>
    );
};

export default SettingViews;
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
