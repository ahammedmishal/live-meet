import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-input';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';

const PhoneLogin = ({navigation}) => {
    const phoneRef = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const handlePhoneInputChange = number => {
        setPhoneNumber(number);
    };

    return (
        <View
            style={{flex: 1, backgroundColor: AppColors.white, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons.Feather
                    name="chevron-left"
                    size={wp('9')}
                    color={AppColors.black}
                    style={{marginVertical: hp('6'), marginLeft: wp('-40')}}
                />
            </TouchableOpacity>
            <Text
                style={{
                    fontFamily: FontStyle.boldFont,
                    fontSize: wp('6'),
                    color: AppColors.black,
                }}>
                Login with Phone
            </Text>
            <View
                style={{
                    backgroundColor: AppColors.grey,
                    flexDirection: 'row',
                    width: wp('80'),
                    borderRadius: 100,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: hp('5'),
                    height: hp('7'),
                    paddingHorizontal: wp('4'),
                }}>
                <PhoneInput
                    initialCountry="in"
                    ref={phoneRef}
                    value={phoneNumber}
                    // onChangePhoneNumber={handlePhoneInputChange}
                    disabled={true}
                    style={{
                        width: wp('20'),
                        borderRightWidth: wp('0.4'),
                        marginRight: wp('6'),
                    }}
                />
                <TextInput
                    // style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                    autoFocus={true}
                />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Verification', {phoneNumber})}
                style={{
                    height: hp('7'),
                    width: wp('75'),
                    backgroundColor: AppColors.primary,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: AppColors.white,
                        fontFamily: FontStyle.boldFont,
                        fontSize: wp('5'),
                    }}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhoneLogin;
