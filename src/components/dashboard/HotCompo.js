import {
    View, Text, FlatList, Image, ImageBackground, TouchableOpacity, Pressable, Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import GradientCircle from '../../components/gradients/GradientCircle';
import {collection, getDocs} from 'firebase/firestore';
import {db} from "../../../firebase";
import Loader from "../../screens/loader/Loader";
import Icon from 'react-native-vector-icons/FontAwesome';

const HotCompo = ({navigation, videoModalAvatar, setVideoModal, setCallInformation, setVideoCall, videoCall}) => {
    const [hotList, setHotList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchAllData = async (collectionName) => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
        return dataList;
    };

    const fetchData = async () => {
        setIsLoading(true);
        const data = await fetchAllData('Girls');
        setIsLoading(false);
        setHotList(data);
    };

    //
    // const randomCall = async () => {
    //     try {
    //         const index = Math.floor(Math.random() * hotList.length);
    //         const userInfo = hotList[index];
    //         setCallInformation(userInfo);
    //         console.log(videoCall);
    //         if (!videoCall) setVideoCall(true);
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // useEffect(() => {
    //     // const interval = setInterval(randomCall, 60000);
    //     const interval = setInterval(randomCall, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '..';
        }
        return str;
    };

    const rotateAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shake = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.sequence([
                        Animated.timing(rotateAnimation, {
                            toValue: 1,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                        Animated.timing(rotateAnimation, {
                            toValue: -1,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(rotateAnimation, {
                            toValue: 1,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                        Animated.timing(rotateAnimation, {
                            toValue: -1,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.timing(rotateAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.delay(1000),
                ])
            ).start();
        };

        shake();
    }, [rotateAnimation]);

    const rotate = rotateAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-10deg', '10deg'],
    });

    // useEffect(() => {
    //     shake();
    // }, []);


    return (<>
        <Loader isLoading={isLoading}/>
        <View>
            <FlatList
                data={hotList}
                numColumns={'2'}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Pressable style={{height: hp('33'), width: wp('48'), position: "relative"}}
                               onPress={() => navigation.navigate("ProfileDetail", {data: item})}
                    >
                        <ImageBackground
                            source={{uri: item.avatar}}
                            imageStyle={{
                                height: hp('32'),
                                width: wp('45'),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: wp('3'), // position: "relative",
                            }}>
                            <View style={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                backgroundColor: "rgba(0,0,0,0.2)",
                                borderRadius: 20,
                                paddingVertical: 2,
                                paddingHorizontal: 8,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <View
                                    style={{width: 10, height: 10, backgroundColor: "#2ED612", borderRadius: 50,}}
                                />
                                <Text style={{
                                    fontFamily: FontStyle.semiBoldFont, fontSize: 10, color: "#fff", marginLeft: 4,
                                }}>Online</Text>
                            </View>
                            <View
                                style={{
                                    position: 'absolute', // bottom : 50,
                                    bottom: hp('-33'), paddingLeft: wp('2'), width: wp('45'), // width: "100%",
                                    // height: "100%",
                                    // position: "absolute",
                                    // left: 0,
                                    // bottom: -200,
                                    justifyContent: 'space-between', flexDirection: 'row',
                                }}>
                                <View style={{width: wp('28')}}>
                                    <Text
                                        style={{
                                            fontFamily: FontStyle.boldFont,
                                            fontSize: 16,
                                            color: AppColors.white,
                                            marginTop: 0,
                                        }}>
                                        {truncateString(item.name, 12)}

                                        {/*<Animated.View style={{transform: [{translateX: rotateAnimation}]}}>*/}
                                        {/*    <Icon name="exclamation-circle" size={50} color="#f00"/>*/}
                                        {/*</Animated.View>*/}
                                        {/*{item.name}*/}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: AppColors.white,
                                        borderTopLeftRadius: wp('8'),
                                        marginRight: wp('-1'),
                                        height: hp('8'),
                                        width: hp('8'),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Animated.View style={{transform: [{rotate}]}}>
                                        <GradientCircle height={hp('6')} width={hp('6')} icoType={Icons.FontAwesome5}
                                                        iconColor={AppColors.white} iconName={"video"}
                                                        avatar={item.avatar}
                                                        iconSize={wp('5')} onPress={() => {
                                            videoModalAvatar(item.avatar)
                                            setVideoModal(true)
                                        }}/>
                                    </Animated.View>
                                </View>
                            </View>
                        </ImageBackground>
                    </Pressable>)}
            />
        </View>
    </>);
};

export default HotCompo;
  