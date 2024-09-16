import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon, { Icons } from '../../assets/styles/Icons'
import AppColors from '../../assets/colors/AppColors'
import FontStyle from '../../assets/styles/FontStyle'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
const LevelRules = () => {
    const [rulesList, setRulesList] = useState([{
        level:0,
        consumption:1000
    },{
        level:1,
        consumption:1000
    },{
        level:2,
        consumption:1000
    },{
        level:3,
        consumption:1000
    },{
        level:4,
        consumption:1000
    },{
        level:5,
        consumption:1000
    },{
        level:6,
        consumption:1000
    },{
        level:7,
        consumption:1000
    },{
        level:8,
        consumption:1000
    },{
        level:9,
        consumption:1000
    },{
        level:10,
        consumption:1000
    },])
  return (
        <FlatList data={rulesList}
        renderItem={({item})=>(
            <View style={styles.container}>
                <View style={{flexDirection:'row',backgroundColor:AppColors.yellow,paddingHorizontal:wp('2'),borderRadius:100}}>
<Icon name={item.level<=6?'crown':'daimond'} size={wp('4')} type={Icons.FontAwesome6} color={AppColors.white}/>
                <Text style={{fontFamily:FontStyle.mediumFont,color:AppColors.white}}>{item.level}</Text>
                </View>
                <Text>{item.consumption}</Text>
            </View>
        )}/>

  )
}

export default LevelRules

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        width:wp('50'),
        flexDirection:'row'
    }
})