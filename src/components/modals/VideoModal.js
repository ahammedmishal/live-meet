import {Modal, View, Text, Dimensions, Pressable, Image, TouchableOpacity, ToastAndroid} from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fontStyle from "../../assets/styles/FontStyle";
import {useState} from "react";
// import * as RNUpiPayment from "react-native-upi-payment";

const rupee = '₹';
export default function VideoModal({navigation, avatar, isVisible, setIsVisible}) {
    const [active, setActive] = useState('7550')
    const [amount, setAmount] = useState('0');

    const paymentGateway = async () => {
        console.log("Initializing...");

        // RNUpiPayment.initializePayment(
        //     {
        //         vpa: 'SACHINCHAHAR.36051891@HDFCBANK', // or can be john@ybl or mobileNo@upi
        //         payeeName: 'Livmeetup',
        //         amount: amount,
        //         transactionRef: 'aasf-332-aoei-fn',
        //     },
        //     successCallback,
        //     failureCallback
        // );
    }

    async function successCallback(data) {
        ToastAndroid.show("Purchased Done!", ToastAndroid.LONG);
    }

    function failureCallback(data) {
        ToastAndroid.show("Purchased Cancelled!", ToastAndroid.LONG);
    }


    return (<Modal visible={isVisible} transparent={true}
                   animated={true}
                   animationType={'fade'}
                   onDismiss={() => setIsVisible(false)}
                   onRequestClose={() => setIsVisible(false)}
    >
        <View style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            backgroundColor: "rgba(0,0,0,0.15)",
            position: "absolute",
            top: 0,
            left: 0,
        }}>
            <View style={{
                backgroundColor: "#F4FBFF",
                width: Dimensions.get("screen").width,
                height: hp('75'),
                position: "absolute",
                bottom: 0,
                left: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <View style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                }}>
                    <Pressable style={{
                        width: 35,
                        height: 35,
                        backgroundColor: "#fff",
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }} onPress={() => setIsVisible(false)}>
                        <MaterialCommunityIcons name={'close'} size={15} color={'#333'}/>
                    </Pressable>
                </View>
                <View style={{paddingVertical: 15, paddingHorizontal: 20, width: "100%",}}>
                    <View style={{marginTop: 10, flexDirection: "row", alignItems: "center",}}>
                        <Image source={{uri: avatar}} style={{width: 70, height: 70, borderRadius: 50,}}/>
                        <Text style={{
                            marginLeft: 10,
                            width: "70%",
                            fontFamily: fontStyle.semiBoldFont,
                            color: "#444",
                            fontSize: 13,
                        }}>Let's play baby! Recharge and call me,I want to
                            show you
                            💋</Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "7550" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("7550")
                            setAmount("100")
                        }}>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamond_large.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>7550</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}100.00</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "8100" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("8100");
                            setAmount("200")
                        }}>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamonds.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>8100</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}200.00</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "16380" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("16380")
                            setAmount("400")
                        }}>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamonds.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>16380</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}400.00</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "32940" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("32940")
                            setAmount("800")
                        }}>
                            <View style={{
                                backgroundColor: "#E72929",
                                position: "absolute",
                                left: 0,
                                top: 0,
                                paddingVertical: 0,
                                paddingHorizontal: 8,
                                borderBottomRightRadius: 30,
                            }}>
                                <Text
                                    style={{fontFamily: fontStyle.boldFont, fontSize: 10, color: "#fff"}}>17%off</Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamonds.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>32940</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}800.00</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "66600" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("66600");
                            setAmount("1600")
                        }}>
                            <View style={{
                                backgroundColor: "#E72929",
                                position: "absolute",
                                left: 0,
                                top: 0,
                                paddingVertical: 0,
                                paddingHorizontal: 8,
                                borderBottomRightRadius: 30,
                            }}>
                                <Text
                                    style={{fontFamily: fontStyle.boldFont, fontSize: 10, color: "#fff"}}>30%off</Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamonds.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>66600</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}1,600.00</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{
                            marginTop: 8,
                            width: "30%",
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            paddingBottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            borderColor: "#1C1678",
                            borderWidth: active === "167400" ? 2 : 0,
                            borderRadius: 10,
                            overflow: "hidden",
                        }} onPress={() => {
                            setActive("167400")
                            setAmount("40000")
                        }}>
                            <View style={{
                                backgroundColor: "#E72929",
                                position: "absolute",
                                left: 0,
                                top: 0,
                                paddingVertical: 0,
                                paddingHorizontal: 8,
                                borderBottomRightRadius: 30,
                            }}>
                                <Text
                                    style={{fontFamily: fontStyle.boldFont, fontSize: 10, color: "#fff"}}>60%off</Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Image source={require('../../assets/images/diamonds.png')}
                                       style={{width: 40, height: 40, objectFit: "fill"}}/>
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    fontSize: 17,
                                    marginVertical: 5,
                                    color: "#222",
                                }}>167400</Text>
                            </View>
                            <View style={{
                                backgroundColor: "#FFF8DC",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 3,
                            }}>
                                <Text style={{fontFamily: fontStyle.regularFont, fontSize: 12, color: "#333"}}>
                                    {rupee}4,000.00</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 12,
                        flexDirection: "row",
                    }}>
                        <Image source={require('../../assets/images/diamond_large.png')}
                               style={{width: 20, height: 20, marginRight: 5,}}/>
                        <Text style={{fontFamily: fontStyle.boldFont, fontSize: 16, color: "#222"}}>My Gems:</Text>
                        <Text style={{fontFamily: fontStyle.boldFont, fontSize: 16, color: "#1C1678"}}> 0</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#5755FE",
                            width: "80%",
                            paddingVertical: 10,
                            borderRadius: 40,
                        }} onPress={() => {
                            setIsVisible(false);
                            navigation.navigate("Payments", {amount: amount});
                        }}>
                            <Text style={{
                                fontFamily: fontStyle.boldFont,
                                fontSize: 18,
                                color: "#fff",
                                textAlign: "center"
                            }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    </Modal>)
}