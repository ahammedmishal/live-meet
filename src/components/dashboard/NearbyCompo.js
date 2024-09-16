import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity, Pressable, ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import GradientView from '../../components/gradients/GradientView';
import Loader from "../../screens/loader/Loader";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GreetingMessages from "../messages/GreetingMessages";
import Messages from "../messages/Messages";

const NearbyCompo = ({navigation}) => {
    const [hotList, setHotList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const hotListRef = useRef(hotList);
    useEffect(() => {
        hotListRef.current = hotList;
    }, [hotList]);
    const extractNumericValue = (distanceString) => {
        const numericValue = parseFloat(distanceString.replace(/[^0-9.]/g, ''));
        return isNaN(numericValue) ? 0 : numericValue;
    };

    const fetchAllData = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const dataList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort dataList by distance
            dataList.sort((a, b) => {
                const distanceA = extractNumericValue(a.distance);
                const distanceB = extractNumericValue(b.distance);
                return distanceA - distanceB;
            });

            return dataList;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const data = await fetchAllData('Girls');
        setIsLoading(false);
        // await AsyncStorage.setItem("Messages", JSON.stringify([]));
        setHotList(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '..';
        }
        return str;
    };
    return (
        <>
            <Loader isLoading={isLoading}/>
            <View>
                <FlatList
                    data={hotList}
                    contentContainerStyle={{
                        paddingBottom: 25
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <Pressable style={{
                            flexDirection: 'row',
                            paddingTop: hp('2'),
                            paddingHorizontal: wp('2'),
                            width: wp('95'),
                            justifyContent: 'space-between'
                        }} onPress={() => navigation.navigate("ProfileDetail", {data: item})}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={{uri: item.avatar}}
                                       style={{
                                           height: hp('8'),
                                           width: hp('8'),
                                           borderRadius: 100,
                                           marginRight: wp('4')
                                       }}/>
                                <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{
                                        fontFamily: FontStyle.mediumFont,
                                        fontSize: wp('4.8'),
                                        color: AppColors.black
                                    }}>{item.name}</Text>
                                    <View
                                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Icons.Ionicons name='location-sharp' size={wp('4')} color={"#999"}/>
                                        <Text style={{
                                            fontFamily: FontStyle.regularFont,
                                            fontSize: wp('3.5'),
                                            marginLeft: wp('1'),
                                            color: "#999"
                                        }}>{item.distance}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={async () => {
                                const index = Math.floor(Math.random() * hotListRef.current.length);
                                let randomMessage = Math.floor(Math.random() * GreetingMessages.length);
                                randomMessage = GreetingMessages[randomMessage];

                                let messages = await AsyncStorage.getItem("Messages");
                                let randomReply = Math.floor(Math.random() * Messages.length);
                                randomReply = Messages[randomReply];
                                let randomReply2 = Math.floor(Math.random() * Messages.length);
                                randomReply2 = Messages[randomReply2];
                                let randomReply3 = Math.floor(Math.random() * Messages.length);
                                randomReply3 = Messages[randomReply3];
                                console.log(messages);
                                if (messages) {
                                    messages = JSON.parse(messages);
                                    console.log(messages);
                                    const isExist = messages.find(m => m.name === item.name);

                                    if (!isExist) {
                                        let msg = {
                                            avatar: item.avatar,
                                            name: item.name,
                                            message: randomMessage,
                                            reply: JSON.stringify([randomReply, randomReply2, randomReply3]),
                                        }
                                        messages.push(msg);
                                        const index = hotList.findIndex(m => m.name === item.name);
                                        // const Msgindex = hotList.findIndex(m => m.name === item.name);
                                        // setInterval(() => {
                                        //     let randomReply = Math.floor(Math.random() * Messages.length);
                                        //     randomReply = Messages[randomReply];
                                        //     console.log(randomReply);
                                        //     let prevMessage = messages[Msgindex];
                                        //     prevMessage = prevMessage.reply;
                                        //     console.log(prevMessage);
                                        //     prevMessage.push(randomReply);
                                        // }, 5000);
                                        console.log(index);
                                        if (index !== -1) {
                                            hotList.splice(index, 1);
                                        }
                                        setIsLoading(true);
                                        setTimeout(() => {
                                            setIsLoading(false)
                                            setHotList(hotList);
                                        })

                                        await AsyncStorage.setItem("Messages", JSON.stringify(messages));
                                        ToastAndroid.show("Hi send.", ToastAndroid.SHORT);
                                    } else {
                                        const index = hotList.findIndex(m => m.name === item.name);
                                        console.log(index);
                                        if (index !== -1) {
                                            hotList.splice(index, 1);
                                        }
                                        setIsLoading(true);
                                        setTimeout(() => {
                                            setIsLoading(false)
                                            setHotList(hotList);
                                        })

                                        await AsyncStorage.setItem("Messages", JSON.stringify(messages));
                                        ToastAndroid.show("Hi message already shared.", ToastAndroid.SHORT);
                                    }
                                } else {
                                    messages = [];
                                    let msg = {
                                        avatar: item.avatar,
                                        name: item.name,
                                        message: randomMessage,
                                        reply: JSON.stringify([randomReply, randomReply2, randomReply3]),
                                    }
                                    messages.push(msg);
                                    const index = hotList.findIndex(m => m.name === item.name);
                                    console.log(index);
                                    if (index !== -1) {
                                        hotList.splice(index, 1);
                                    }
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false)
                                        setHotList(hotList);
                                    })
                                    await AsyncStorage.setItem("Messages", JSON.stringify(messages));
                                    ToastAndroid.show("Hi send.", ToastAndroid.SHORT);
                                }
                            }}>
                                <GradientView>
                                    <Text style={{
                                        color: AppColors.white,
                                        backgroundColor: 'rgba(255,20,147,0.4)',
                                        borderRadius: 100,
                                        height: hp('3.2'),
                                        width: hp('3.2'),
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                        fontFamily: FontStyle.boldItalicFont,
                                        fontSize: wp('3.8')
                                    }}>Hi</Text>
                                </GradientView>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                />

            </View>
        </>
    );
};

export default NearbyCompo;
  