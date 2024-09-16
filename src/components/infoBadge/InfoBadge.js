import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontStyle from '../../assets/styles/FontStyle';
import AppColors from '../../assets/colors/AppColors';
import Icon from '../../assets/styles/Icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const InfoBadge = ({text,iconName,iconSize,iconType, bgColor}) => {
  return (
    <View style={styles.container(bgColor)}>
      <Icon
        name={iconName}
        type={iconType}
        size={iconSize}
        color={AppColors.white}
      />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export default InfoBadge;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontStyle.mediumFont,
    fontSize: wp('3.5'),
    marginLeft: wp('1'),
    color: AppColors.white,
  },
  container: bg => ({
    flexDirection: 'row',
    borderRadius:wp('6'),
    backgroundColor: bg,
    paddingHorizontal: wp('1.5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:wp('1'),
  }),
});
