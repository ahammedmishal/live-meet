import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AppColors from '../../assets/colors/AppColors'
import FontStyle from '../../assets/styles/FontStyle'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'

const GradientLongButton = ({
                                title, navigation,
                                onPress,
                                navigateTo
                            }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={[AppColors.pink, AppColors.darkViolet,]}
                style={{
                    // backgroundColor: AppColors.blue,
                    height: hp('6'),
                    width: wp('65'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp('6'),
                }}>

                <Text style={{color: AppColors.white, fontFamily: FontStyle.boldFont}}>{title}</Text>

            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientLongButton