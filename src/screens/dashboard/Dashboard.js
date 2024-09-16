import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
    Pressable,
    ToastAndroid
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import HotCompo from '../../components/dashboard/HotCompo';
import NearbyCompo from '../../components/dashboard/NearbyCompo';
import CustomStatusbar from '../../components/customStatusbar/CustomStatusBar'
import VideoModal from "../../components/modals/VideoModal";
import VideoCall from "../videoCall/VideoCall";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fontStyle from "../../assets/styles/FontStyle";
import LinearGradient from "react-native-linear-gradient";
import {StackActions} from "@react-navigation/native";
import GreetingMessages from "../../components/messages/GreetingMessages";
import Messages from "../../components/messages/Messages";

const Dashboard = ({navigation}) => {
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    const [topTab, setTopTab] = useState(true);
    const [videoCallVisible, setVideoCallVisible] = useState(false)
    const [callInformation, setCallInformation] = useState(null)
    const [hotList, setHotList] = useState([])
    const videoCallVisibleRef = useRef(videoCallVisible);
    const hotListRef = useRef(hotList);
    const device = useCameraDevice('back');
    const {hasPermission} = useCameraPermission();
    const [isMessage, setIsMessage] = useState(true)

    useEffect(() => {
        videoCallVisibleRef.current = videoCallVisible;
    }, [videoCallVisible]);

    useEffect(() => {
        hotListRef.current = hotList;
    }, [hotList]);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            if (status === 'denied') {
                alert('Camera permission denied');
            }

        })();
    }, []);

    const fetchAllData = async (collectionName) => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        return dataList;
    };

    const fetchData = async () => {
        const data = await fetchAllData('Girls');
        // await AsyncStorage.setItem("Messages", JSON.stringify([]));
        // await AsyncStorage.setItem("CallHistory", JSON.stringify([]));
        setHotList(data);
        // console.log(data);
    };

    const randomCall = async () => {
        try {
            let user = await AsyncStorage.getItem("UserId");
            console.log(videoCallVisibleRef.current);
            if (user) {
                if (videoCallVisibleRef.current === false) {
                    const index = Math.floor(Math.random() * hotListRef.current.length);
                    // console.log(index);
                    const userInfo = hotListRef.current[index];
                    // console.log(userInfo);
                    if (userInfo) {
                        setCallInformation(userInfo);
                        setVideoCallVisible(true);
                    } else {
                        await fetchData();
                    }
                    console.log("Video Call is hide");
                } else {
                    console.log("Call already running...");
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function checkMessage() {
        let message = await AsyncStorage.getItem("HiMessage");
        // console.log(`Hi Message ${message}`);
        if (!message)
            setIsMessage(true);
        else
            setIsMessage(false)

        // await AsyncStorage.setItem("Messages", JSON.stringify([]));
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(randomCall, 20000);
        checkMessage();
        return () => clearInterval(interval);

        // const interval = setInterval(randomCall, 120000);
        // const interval = setInterval(randomCall, 90000);

    }, []);

    const sendRandomMessages = async () => {
        try {
            let loopCount = hotList.length >= 10 ? 10 : hotList.length;
            for (let i = 0; i < loopCount; i++) {
                const index = Math.floor(Math.random() * hotListRef.current.length);
                let randomMessage = Math.floor(Math.random() * GreetingMessages.length);
                // let randomReply = Math.floor(Math.random() * Messages.length);
                // console.log("Message Index " + randomMessage);
                randomMessage = GreetingMessages[randomMessage];
                // randomReply = Messages[randomReply];
                let randomReply = Math.floor(Math.random() * Messages.length);
                randomReply = Messages[randomReply];
                let randomReply2 = Math.floor(Math.random() * Messages.length);
                randomReply2 = Messages[randomReply2];
                let randomReply3 = Math.floor(Math.random() * Messages.length);
                randomReply3 = Messages[randomReply3];

                // console.log(randomMessage);
                console.log("User Index " + index);
                const userInfo = hotListRef.current[index];
                let messages = await AsyncStorage.getItem("Messages");
                // console.log(messages);
                if (messages) {
                    messages = JSON.parse(messages);
                    const isExist = messages.find(m => m.name === userInfo.name);
                    if (!isExist) {
                        let msg = {
                            avatar: userInfo.avatar,
                            name: userInfo.name,
                            message: randomMessage,
                            reply: JSON.stringify([randomReply, randomReply2, randomReply3]),
                        }
                        messages.push(msg);
                        await AsyncStorage.setItem("Messages", JSON.stringify(messages));
                        ToastAndroid.show("Greeting messages has been sent.", ToastAndroid.SHORT);
                    }
                } else {
                    messages = [];
                    let msg = {
                        avatar: userInfo.avatar,
                        name: userInfo.name,
                        message: randomMessage,
                        reply: JSON.stringify([randomReply, randomReply2, randomReply3]),
                    }
                    messages.push(msg);

                    await AsyncStorage.setItem("Messages", JSON.stringify(messages));
                    ToastAndroid.show("Greeting messages has been sent.", ToastAndroid.SHORT);
                }
                // console.log("Message");
            }
            setIsMessage(false);
            await AsyncStorage.setItem("HiMessage", 'true');

        } catch (e) {
            console.log(e)
        }
    }

    return (<>
        <VideoCall callInfo={callInformation} isVisible={videoCallVisible}
                   setIsVisible={setVideoCallVisible}/>
        <Modal visible={isMessage} animated={true} animationType={'fade'}
               onDismiss={() => setIsMessage(false)}
               onRequestClose={() => setIsMessage(false)}
               transparent={true}
        >
            <View style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 50,
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    paddingVertical: 30,
                    paddingHorizontal: 20,
                    width: "100%",
                    borderRadius: 10,
                }}>
                    <Pressable onPress={async () => {
                        setIsMessage(false);
                    }}
                               style={{
                                   backgroundColor: "#fff",
                                   width: 30,
                                   height: 30,
                                   borderRadius: 50,
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   position: "absolute",
                                   left: "50%",
                                   bottom: -40,
                               }}
                    >
                        <MaterialCommunityIcons color={AppColors.black} name={'close'} size={20}/>
                    </Pressable>
                    <Image source={require('../../assets/images/hi.png')}
                           style={{
                               width: 80,
                               height: 80,
                               position: "absolute",
                               top: -40,
                               left: "40%",
                           }}
                    />
                    <Text
                        style={[{
                            fontFamily: fontStyle.semiBoldFont,
                            textAlign: "center",
                            color: AppColors.black,
                            fontSize: 16,
                            marginTop: 10,
                        }]}>
                        Say Hi! to random people to make new friends.
                    </Text>
                    <View style={{justifyContent: "center", flexDirection: "row", marginTop: 10,}}>
                        <TouchableOpacity onPress={async () => {
                            await sendRandomMessages();
                        }}>
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={[AppColors.pink, AppColors.darkViolet,]}
                                style={{
                                    // backgroundColor: AppColors.blue,
                                    height: hp('6'),
                                    width: wp('50'),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: wp('6'),
                                }}>

                                <Text
                                    style={{color: AppColors.white, fontFamily: fontStyle.boldFont}}>Say Hi!</Text>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        <View
            style={{
                flex: 1,
                paddingHorizontal: wp('3'),
                paddingVertical: hp('3'),
                paddingTop: hp('7'),
                backgroundColor: AppColors.white,
            }}>
            {/*<Camera*/}
            {/*    style={[StyleSheet.absoluteFill,{zIndex : 9999}]}*/}
            {/*    device={device}*/}
            {/*    isActive={true}*/}

            {/*/>*/}
            <CustomStatusbar/>
            <View
                style={{
                    flexDirection: 'row',
                    width: wp('28'),
                    justifyContent: 'space-between',
                    paddingHorizontal: wp('1'),
                    paddingBottom: hp('1.5'),
                }}>
                <TouchableOpacity
                    onPress={() => setTopTab(true)}
                    style={[topTab == true ? {
                        borderBottomColor: AppColors.black, borderBottomWidth: wp('0.5'),
                    } : {
                        borderBottomColor: AppColors.white, borderBottomWidth: wp('0.5'),
                    },]}>
                    <Text
                        style={{
                            fontFamily: FontStyle.boldFont, fontSize: wp('4'), color: AppColors.black,
                        }}>
                        Hot
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTopTab(false)}
                    style={[topTab == false ? {
                        borderBottomColor: AppColors.black, borderBottomWidth: wp('0.5'),
                    } : {
                        borderBottomColor: AppColors.white, borderBottomWidth: wp('0.5'),
                    },]}>
                    <Text
                        style={{
                            fontFamily: FontStyle.boldFont, fontSize: wp('4'), color: AppColors.black,
                        }}>
                        Nearby
                    </Text>
                </TouchableOpacity>
            </View>
            {topTab ? <HotCompo navigation={navigation} videoCall={videoCallVisible} setVideoCall={setVideoCallVisible}
                                setCallInformation={setCallInformation} videoModalAvatar={setVideoModalAvatar}
                                setVideoModal={setVideoModal}/> : <NearbyCompo navigation={navigation}/>}

            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>


        </View>
    </>);
};

export default Dashboard;
