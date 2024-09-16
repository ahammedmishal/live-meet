import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { Icons } from '../../assets/styles/Icons'
import AppColors from '../../assets/colors/AppColors'
import FontStyle from '../../assets/styles/FontStyle'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  

const Header = ({navigation,scrnName,leftIconClr,rightIconClr,iconName,iconType,navigateTo}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:wp('6')}}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
    <Icon name={'chevron-left'} type={Icons.Feather} size={wp('9')} color={leftIconClr} />
    </TouchableOpacity>
    <Text style={styles.scrnName}>{scrnName}</Text>
    <TouchableOpacity>

    <Icon name={iconName} type={iconType} size={wp('9')} color={rightIconClr} />
    </TouchableOpacity>
  </View>
)
}

export default Header

const styles = StyleSheet.create({
    scrnName: {
        fontFamily: FontStyle.semiBoldFont,
        fontSize: wp('6'),
        color: AppColors.black,
        // marginLeft:wp('24')
      },
})