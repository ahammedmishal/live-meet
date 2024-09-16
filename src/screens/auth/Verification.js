import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import React, {useRef, useState} from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';


const Verification = ({navigation, route}) => {
    const [values, setValues] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChangeText = (text, index) => {
        const newValues = [...values];
        newValues[index] = text;
        setValues(newValues);
        if (index === 0) {
            inputs.current[index].focus();
        }
        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: AppColors.white,
            alignItems: 'center',
            paddingVertical: hp('15'),
            paddingHorizontal: wp('15')
        }}>
            <Text style={{color: AppColors.black, fontFamily: FontStyle.boldFont, fontSize: wp('6')}}>Enter your
                verification code</Text>
            <Text style={{color: AppColors.black, fontFamily: FontStyle.mediumFont, fontSize: wp('4')}}>Verification
                code has been sent to +91{route.params.phoneNumber}</Text>
            <View style={{
                flexDirection: 'row',
                marginVertical: hp('3'),
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('60')
            }}>
                {values.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={ref => inputs.current[index] = ref}
                        value={value}
                        onChangeText={text => handleChangeText(text, index)}
                        style={{
                            height: hp('7'),
                            width: hp('6'),
                            backgroundColor: AppColors.grey,
                            borderRadius: wp('1'),
                            paddingHorizontal: wp('4.6'),
                            fontFamily: FontStyle.regularFont,
                            fontSize: wp('5')
                        }}
                        maxLength={1} // Limiting to 1 character
                        keyboardType="numeric" // Assuming numeric input
                    />
                ))}
                {/* <TextInput autoFocus style={{height:hp('7'),width:hp('6'),backgroundColor:AppColors.grey,borderRadius:wp('1'),paddingHorizontal:wp('4.6'),fontFamily:FontStyle.regularFont,fontSize:wp('5')}} keyboardType='numeric'/>
      <TextInput style={{height:hp('7'),width:hp('6'),backgroundColor:AppColors.grey,borderRadius:wp('1'),paddingHorizontal:wp('4.6'),fontFamily:FontStyle.regularFont,fontSize:wp('5')}} keyboardType='numeric'/>
      <TextInput style={{height:hp('7'),width:hp('6'),backgroundColor:AppColors.grey,borderRadius:wp('1'),paddingHorizontal:wp('4.6'),fontFamily:FontStyle.regularFont,fontSize:wp('5')}} keyboardType='numeric'/>
      <TextInput style={{height:hp('7'),width:hp('6'),backgroundColor:AppColors.grey,borderRadius:wp('1'),paddingHorizontal:wp('4.6'),fontFamily:FontStyle.regularFont,fontSize:wp('5')}} keyboardType='numeric'/> */}
            </View>
            {/* <LinearGradient > */}

            <TouchableOpacity
                onPress={() => navigation.navigate('TabScreens')}
                style={{
                    height: hp('7'),
                    width: wp('75'),
                    backgroundColor: AppColors.primary,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: hp('3')
                }}>
                <Text
                    style={{
                        color: AppColors.white,
                        fontFamily: FontStyle.boldFont,
                        fontSize: wp('5'),
                    }}>
                    Login
                </Text>
            </TouchableOpacity>

            {/* </LinearGradient> */}
        </View>
    )
}

export default Verification