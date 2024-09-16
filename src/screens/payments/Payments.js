import AppColors from "../../assets/colors/AppColors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import CustomStatusBar from "../../components/customStatusbar/CustomStatusBar";
import Header from "../../components/headers/Header";
import React, {useEffect, useState} from "react";
import {View, Text, Pressable, Image, TouchableOpacity, Linking} from "react-native";
import fontStyle from "../../assets/styles/FontStyle";
import {Checkbox} from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Loader from "../loader/Loader";
import {db} from "../../../firebase";
import {doc, getDoc} from 'firebase/firestore'

const rupee = '₹';
export default function Payments({navigation, route}) {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiId, setUpiId] = useState('8755922331.57529543@Sbi');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadUPIID();
    }, []);
    const loadUPIID = async () => {
        setIsLoading(true);
        const idDocRef = doc(db, 'UPI', '1');
        const idDoc = await getDoc(idDocRef);
        if (idDoc.data()) {
            setUpiId(idDoc.data().upi)
        }
        console.log(idDoc.data().upi)
        setIsLoading(false);
    }

    return (
        <>
            <Loader isLoading={isLoading}/>
            <View style={{flex: 1, backgroundColor: AppColors.white, width: wp('100'), paddingVertical: hp('5')}}>
                <CustomStatusBar/>
                <Header navigation={navigation} scrnName={'Payment options'} leftIconClr={AppColors.black}
                        rightIconClr={AppColors.black}/>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 15,
                }}>
                    <Text style={{
                        fontFamily: fontStyle.boldFont,
                        fontSize: 25,
                        color: AppColors.black
                    }}>INR {route.params.amount}.00</Text>
                </View>
                <View style={{paddingHorizontal: 20,}}>
                    <View style={{
                        width: "100%",
                        height: "80%",
                        backgroundColor: "#f8f8f8",
                        borderRadius: 20,
                        paddingVertical: 20,
                        paddingHorizontal: 15,
                    }}>
                        <View style={{
                            paddingVertical: 4,
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(0,0,0,0.2)"
                        }}>
                            <Text style={{fontFamily: fontStyle.semiBoldFont, fontSize: 13,}}>Options for you</Text>
                        </View>
                        <View style={{marginTop: 20,}}>
                            <TouchableOpacity style={{
                                marginVertical: 5,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }} onPress={() => {
                                // setPaymentMethod('Paytm')
                                Linking.openURL(`Paytmmp://pay?pa=${upiId}&tn=&am=${route.params.amount}&mam=00.24&orgid=159765&pn=Harshit%7C%7CPandey&mode=16&purpose=00&mc=0000&tr=gptn.993386008&url=&category&ver=01&cu=INR&mid=&msid=&mtid=&enTips=&mg=OFFLINE&qrMedium=04&invoiceNo=&invoiceDate=&QRts=2024-07-29%2021:55:15&QRexpire=&Split=&PinCode=&Tier=&txntype=&Consent=&mn=&type=&validitystart=&validityend=&Amrule=&Recur=&Recurvalue=&RecureType=&Rev=&Share=&Block=&Umn=&Skip=&sign=AMUgG8iW8QxyPakOPawbOhR1BMwv6qn33cOWPE98IhB+Skm7+VCnI/e0GoyQCM4c3+qePlXjJg1Fhc7nfE3UCzbTAH4zj2CMaWKKlDqvC65jtZlsVdePpa017JXVt2GFHDFfic2AX26d3qcCsnmHc83omSrkMvLXp9XAbA2EReXvxWCT`).catch(err => console.error("Failed to open URL:", err))
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View style={{
                                        width: 45,
                                        height: 45,
                                        borderWidth: 0.5,
                                        borderColor: "rgba(0,0,0,0.2)",
                                        borderRadius: 5,
                                        padding: 2,
                                    }}>
                                        <Image source={require('../../assets/images/paytm.png')}
                                               style={{width: "100%", height: "100%", objectFit: "fill"}}/>
                                    </View>
                                    <Text style={{
                                        fontFamily: fontStyle.semiBoldFont,
                                        fontSize: 16,
                                        color: AppColors.black,
                                        marginLeft: 10,
                                    }}>Paytm</Text>
                                </View>
                                {/*<Checkbox status={paymentMethod === "Paytm" ? 'checked' : 'unchecked'}*/}
                                {/*          color={AppColors.darkViolet}*/}
                                {/*          uncheckedColor={AppColors.grey}/>*/}
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                marginVertical: 5,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }} onPress={() => {
                                // setPaymentMethod('PhonePe')
                                Linking.openURL(`phonepe://pay?pa=${upiId}&tn=&am=${route.params.amount}&mam=00.24&orgid=159765&pn=Harshit%7C%7CPandey&mode=16&purpose=00&mc=0000&tr=gptn.993386008&url=&category&ver=01&cu=INR&mid=&msid=&mtid=&enTips=&mg=OFFLINE&qrMedium=04&invoiceNo=&invoiceDate=&QRts=2024-07-29%2021:55:15&QRexpire=&Split=&PinCode=&Tier=&txntype=&Consent=&mn=&type=&validitystart=&validityend=&Amrule=&Recur=&Recurvalue=&RecureType=&Rev=&Share=&Block=&Umn=&Skip=&sign=AMUgG8iW8QxyPakOPawbOhR1BMwv6qn33cOWPE98IhB+Skm7+VCnI/e0GoyQCM4c3+qePlXjJg1Fhc7nfE3UCzbTAH4zj2CMaWKKlDqvC65jtZlsVdePpa017JXVt2GFHDFfic2AX26d3qcCsnmHc83omSrkMvLXp9XAbA2EReXvxWCT`).catch(err => console.error("Failed to open URL:", err));
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View style={{
                                        width: 45,
                                        height: 45,
                                        borderWidth: 0.5,
                                        borderColor: "rgba(0,0,0,0.2)",
                                        borderRadius: 5,
                                        padding: 2,
                                    }}>
                                        <Image source={require('../../assets/images/phonepe.png')}
                                               style={{width: "100%", height: "100%", objectFit: "fill"}}/>
                                    </View>
                                    <Text style={{
                                        fontFamily: fontStyle.semiBoldFont,
                                        fontSize: 16,
                                        color: AppColors.black,
                                        marginLeft: 10,
                                    }}>PhonePe</Text>
                                </View>
                                {/*<Checkbox status={paymentMethod === "PhonePe" ? 'checked' : 'unchecked'}*/}
                                {/*          color={AppColors.darkViolet}*/}
                                {/*          uncheckedColor={AppColors.grey}/>*/}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/*<View style={{*/}
                {/*    alignItems: "center",*/}
                {/*}}>*/}
                {/*    <TouchableOpacity onPress={async () => {*/}
                {/*        console.log(paymentMethod);*/}
                {/*        if (paymentMethod === "Paytm") {*/}
                {/*            Linking.openURL(`Paytmmp://pay?pa=${upiId}&tn=&am=${route.params.amount}&mam=00.24&orgid=159765&pn=Harshit%7C%7CPandey&mode=16&purpose=00&mc=0000&tr=gptn.993386008&url=&category&ver=01&cu=INR&mid=&msid=&mtid=&enTips=&mg=OFFLINE&qrMedium=04&invoiceNo=&invoiceDate=&QRts=2024-07-29%2021:55:15&QRexpire=&Split=&PinCode=&Tier=&txntype=&Consent=&mn=&type=&validitystart=&validityend=&Amrule=&Recur=&Recurvalue=&RecureType=&Rev=&Share=&Block=&Umn=&Skip=&sign=AMUgG8iW8QxyPakOPawbOhR1BMwv6qn33cOWPE98IhB+Skm7+VCnI/e0GoyQCM4c3+qePlXjJg1Fhc7nfE3UCzbTAH4zj2CMaWKKlDqvC65jtZlsVdePpa017JXVt2GFHDFfic2AX26d3qcCsnmHc83omSrkMvLXp9XAbA2EReXvxWCT`).catch(err => console.error("Failed to open URL:", err));*/}
                {/*        } else {*/}
                {/*            Linking.openURL(`phonepe://pay?pa=${upiId}&tn=&am=${route.params.amount}&mam=00.24&orgid=159765&pn=Harshit%7C%7CPandey&mode=16&purpose=00&mc=0000&tr=gptn.993386008&url=&category&ver=01&cu=INR&mid=&msid=&mtid=&enTips=&mg=OFFLINE&qrMedium=04&invoiceNo=&invoiceDate=&QRts=2024-07-29%2021:55:15&QRexpire=&Split=&PinCode=&Tier=&txntype=&Consent=&mn=&type=&validitystart=&validityend=&Amrule=&Recur=&Recurvalue=&RecureType=&Rev=&Share=&Block=&Umn=&Skip=&sign=AMUgG8iW8QxyPakOPawbOhR1BMwv6qn33cOWPE98IhB+Skm7+VCnI/e0GoyQCM4c3+qePlXjJg1Fhc7nfE3UCzbTAH4zj2CMaWKKlDqvC65jtZlsVdePpa017JXVt2GFHDFfic2AX26d3qcCsnmHc83omSrkMvLXp9XAbA2EReXvxWCT`).catch(err => console.error("Failed to open URL:", err));*/}
                {/*        }*/}
                {/*    }}>*/}
                {/*        <LinearGradient*/}
                {/*            start={{x: 0, y: 0}} end={{x: 1, y: 1}}*/}
                {/*            colors={[AppColors.pink, AppColors.darkViolet,]}*/}
                {/*            style={{*/}
                {/*                // backgroundColor: AppColors.blue,*/}
                {/*                height: hp('6'),*/}
                {/*                width: wp('50'),*/}
                {/*                justifyContent: 'center',*/}
                {/*                alignItems: 'center',*/}
                {/*                borderRadius: wp('6'),*/}
                {/*            }}>*/}

                {/*            <Text*/}
                {/*                style={{color: AppColors.white, fontFamily: fontStyle.boldFont}}>Continue</Text>*/}

                {/*        </LinearGradient>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        </>
    )
}