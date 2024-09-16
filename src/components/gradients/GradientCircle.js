import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AppColors from '../../assets/colors/AppColors'
import FontStyle from '../../assets/styles/FontStyle'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Icon from '../../assets/styles/Icons'

const GradientCircle = ({
                            iconName, icoType, iconSize, iconColor, height, width, navigation,
                            onPress,
                            navigateTo,
                            avatar,
                        }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={[AppColors.pink, AppColors.darkViolet,]}
                style={{
                    // paddingTop: wp('3'),
                    // paddingLeft: wp('3'),
                    height: height,
                    width: width,
                    borderRadius: 100,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <Icon name={iconName} type={icoType} size={iconSize} color={iconColor}/>

            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientCircle

const styles = StyleSheet.create({})