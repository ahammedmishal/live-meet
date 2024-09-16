import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FontStyle = StyleSheet.create({
  mediumFont: 'Poppins-Medium',
  regularFont: 'Poppins-Regular',
  lightFont: 'Poppins-Light',
  thinFont: 'Poppins-Thin',
  boldFont: 'Poppins-Bold',
  boldItalicFont: 'Poppins-BoldItalic',
  italicFont: 'Poppins-Italic',
  semiBoldFont: 'Poppins-SemiBold',
  font20: wp('20%'),
  font12: wp('7%'),
  font4point5: wp('4.5%'),
});
export default FontStyle;
