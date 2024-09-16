import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../assets/colors/AppColors'
import FontStyle from '../../assets/styles/FontStyle'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import GradientContainer from '../../components/gradients/GradientContainer';
import Header from '../../components/headers/Header';
import { Icons } from '../../assets/styles/Icons';
  
const MyBag = ({navigation}) => {
  return (
            <GradientContainer>
            <Header navigation={navigation} scrnName={'Beans Center'} leftIconClr={AppColors.black} rightIconClr={AppColors.black} iconName={'help-circle-outline'} iconType={Icons.Ionicons}/>
            <Image source={require('../../assets/images/livMetSplash.jpg')} style={{marginTop:hp('-66'),height:hp('10'),width:hp('10'),borderRadius:100,borderWidth:wp('0.5'),borderColor:AppColors.white,alignSelf:'center'}}/>
{/* <View style={{marginTop:hp('-66'),justifyContent:'center',alignItems:'center',alignSelf:'center'}}>

  <Text style={{fontFamily:FontStyle.mediumFont,alignSelf:'center',fontSize:wp('4.8'),color:AppColors.white}}>{'Guest_123'}</Text>
</View> */}

      </GradientContainer>

  )
}

export default MyBag

const styles = StyleSheet.create({})