import {View, Text, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import AppColors from '../../assets/colors/AppColors'


const GradientContainer = ({children}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent barStyle='dark-content'/>
            <LinearGradient
                style={styles.gradient}
                colors={[
                    AppColors.pink,
                    AppColors.darkViolet,
                    //   'transparent',
                    //   'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent',
                    //   'blue',
                    //   'white',
                ]}
                start={{x: 0, y: 1}}
                end={{x: 0.4, y: 1}}
            />
            {children}
        </View>

    )
}

export default GradientContainer
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: AppColors.white,
        // paddingLeft:wp('9')
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: hp('100%'),
        height: wp('100%'),
    },
});