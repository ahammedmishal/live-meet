import { StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AppColors from '../../assets/colors/AppColors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


const GradientView = ({children}) => {
  return (
    <LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    colors={['rgba(255,20,147,0.01)', 'rgba(148,0,211,0.1)',]} 
    style={{borderRadius:100,height:hp('6'),width:hp('6'),justifyContent:'center',alignItems:'center'}}>
{children}
  </LinearGradient>
)
}

export default GradientView

const styles = StyleSheet.create({})