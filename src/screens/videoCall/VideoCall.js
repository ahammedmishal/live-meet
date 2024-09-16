import {Dimensions, Image, ImageBackground, Modal, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fontStyle from "../../assets/styles/FontStyle";
import React, {useEffect, useRef, useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import VideoModal from "../../components/modals/VideoModal";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";

export default function VideoCall({isVisible, setIsVisible, callInfo}) {
    const [isCallActive, setIsCallActive] = useState(false);
    const device = useCameraDevice('front')
    const [seconds, setSeconds] = useState('00:00');
    const [time, setTime] = useState(0);
    const {hasPermission, requestPermission} = useCameraPermission()
    const callActiveRef = useRef(isCallActive);
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    const navigation = useNavigation();

    if (!hasPermission) {
        requestPermission();
    }

    useEffect(() => {
        if (isVisible)
            console.log("Modal is Open");
        console.log(callInfo);
    }, [isVisible]);

    // useEffect(() => {
    //     Sound.setCategory('Playback', true); // Important for iOS, to set audio category
    //     setTimeout(() => {
    //         spinSound.play();
    //     }, 2000)
    // }, []);
    //
    // const spinSound = useRef(
    //     new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    //         if (error) {
    //             console.log('failed to load the sound', error);
    //             return;
    //         }
    //     })
    // ).current;

    const spinSound = useRef(null);

    useEffect(() => {
        Sound.setCategory('Playback', true); // Important for iOS, to set audio category
        if (isVisible) {
            spinSound.current = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                console.log('sound loaded successfully');
                // Set the number of loops to -1 for infinite looping
                spinSound.current.setNumberOfLoops(-1);
                spinSound.current.play((success) => {
                    if (!success) {
                        console.log('playback failed due to audio decoding errors');
                    } else {
                        console.log('sound playing successfully');
                    }
                });
                // setTimeout(() => {
                //
                // }, 2000);
            });

            // Cleanup function to stop the sound when the component unmounts
            return () => {
                if (spinSound.current) {
                    spinSound.current.stop(() => {
                        console.log('sound stopped');
                        spinSound.current.release();
                    });
                }
            };
        }
    }, [isVisible]);


    useEffect(() => {
        callActiveRef.current = isCallActive;
    }, [isCallActive]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                const newTime = prevTime + 1;
                setSeconds(newTime <= 9 ? `00:0${newTime}` : `00:${newTime}`);

                if (newTime === 10) {
                    console.log(callInfo);
                    console.log(isCallActive);
                    if (callActiveRef.current) {
                        setVideoModalAvatar(callInfo.avatar);
                        setIsVisible(false);
                        setIsCallActive(false);
                        setVideoModal(true);
                    }
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [callInfo]);

    useEffect(() => {
        setTime(0);
        setSeconds("00:00");
    }, [isCallActive]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12; // Convert 24h to 12h format and handle 0 (midnight) case
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    };

    async function setVideoCallHistory() {
        let time = getCurrentTime();
        let callHistory = await AsyncStorage.getItem("CallHistory");
        if (callHistory) {
            callHistory = JSON.parse(callHistory);
            let call = {
                time: time,
                call: callInfo,
            }
            callHistory.push(call);
            await AsyncStorage.setItem("CallHistory", JSON.stringify(callHistory));
        } else {
            callHistory = [];
            let call = {
                time: time,
                call: callInfo,
            }
            callHistory.push(call);
            await AsyncStorage.setItem("CallHistory", JSON.stringify(callHistory));
        }
    }

    if (callInfo) {
        return (
            <>
                <Modal visible={isVisible} transparent={true} animationType={'fade'}>
                    {
                        isCallActive ?
                            <View style={{flex: 1}}>
                                <Video
                                    source={{uri: callInfo.video}} // Can be a local file or remote URL
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: Dimensions.get("screen").width,
                                        height: Dimensions.get("screen").height,
                                    }}
                                    muted={false}
                                    repeat={true}
                                    resizeMode="cover"
                                />
                                {device && <Camera
                                    style={{
                                        width: 100,
                                        height: 180,
                                        left: 0,
                                        top: 0,
                                        position: "absolute",
                                    }}
                                    device={device}
                                    isActive={true}
                                    resizeMode={'cover'}
                                />}
                                <Text style={{
                                    fontFamily: fontStyle.boldFont,
                                    color: "#fff",
                                    position: "absolute",
                                    fontSize: 16,
                                    left: 35,
                                    top: 145,
                                }}>{seconds}</Text>
                                {/* Bottom Buttons */}
                                <View style={{
                                    position: "absolute",
                                    bottom: 50,
                                    paddingHorizontal: 90,
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}>
                                    <TouchableOpacity style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 50,
                                        backgroundColor: '#FE226D',
                                        display: 'flex',
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }} onPress={() => {
                                        spinSound.current.stop(() => {
                                            console.log('sound stopped');
                                            spinSound.current.release();
                                        });
                                        setIsVisible(false);
                                        setIsCallActive(false);
                                    }}>
                                        <MaterialCommunityIcons name="phone-hangup" size={35} color={'#fff'}/>
                                    </TouchableOpacity>
                                </View>
                            </View> :
                            <ImageBackground source={{uri: callInfo.avatar}} style={{
                                backgroundColor: "#000",
                                width: Dimensions.get("screen").width,
                                height: Dimensions.get("screen").height,
                                position: "relative",
                            }} blurRadius={30}>
                                <View style={{justifyContent: 'center', flexDirection: "row", marginTop: 100}}>
                                    <View style={{flexDirection: "column", alignItems: "center"}}>
                                        <View style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 100,
                                            backgroundColor: "#fff"
                                        }}>
                                            <Image source={{uri: callInfo.avatar}}
                                                   style={{width: 120, height: 120, borderRadius: 100,}}/>
                                        </View>
                                        <View style={{marginTop: 10}}>
                                            <Text
                                                style={{
                                                    fontFamily: fontStyle.boldFont,
                                                    color: "#fff",
                                                    fontSize: 18,
                                                    textAlign: "center"
                                                }}>{callInfo.name}</Text>
                                            <View style={{flexDirection: "row"}}>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        paddingVertical: 0,
                                                        paddingHorizontal: 6,
                                                        borderRadius: 50,
                                                        backgroundColor: "#FF2AE5",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginLeft: 4,
                                                    }}>
                                                    <MaterialCommunityIcons name={'gender-female'} color={'#fff'}/>
                                                    <Text
                                                        style={{
                                                            fontFamily: fontStyle.semiBoldFont,
                                                            fontSize: 10,
                                                            color: "#fff"
                                                        }}>{callInfo.age}</Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        paddingVertical: 0,
                                                        paddingHorizontal: 6,
                                                        borderRadius: 50,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginLeft: 4,
                                                    }}>
                                                    <MaterialIcons name={'location-pin'} color={'#fff'}/>
                                                    <Text
                                                        style={{
                                                            fontFamily: fontStyle.semiBoldFont,
                                                            fontSize: 10,
                                                            color: "#fff"
                                                        }}>{callInfo.location}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* Bottom Buttons */}
                                <View style={{
                                    position: "absolute",
                                    bottom: 150,
                                    paddingHorizontal: 90,
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}>
                                    <TouchableOpacity style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 50,
                                        backgroundColor: '#FE226D',
                                        display: 'flex',
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }} onPress={async () => {
                                        spinSound.current.stop(() => {
                                            console.log('sound stopped');
                                            spinSound.current.release();
                                        });
                                        await setVideoCallHistory();
                                        setIsVisible(false);
                                    }}>
                                        <MaterialCommunityIcons name="phone-hangup" size={35} color={'#fff'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 50,
                                        backgroundColor: '#2AE9D1',
                                        display: 'flex',
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }} onPress={async () => {
                                        spinSound.current.stop(() => {
                                            console.log('sound stopped');
                                            spinSound.current.release();
                                        });
                                        await setVideoCallHistory();
                                        setIsCallActive(true);
                                    }}>
                                        <MaterialIcons name="call" size={35} color={'#fff'}/>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                    }
                </Modal>
                <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                            setIsVisible={setVideoModal}/>
            </>
        );
    } else {
        return null;
    }
}
