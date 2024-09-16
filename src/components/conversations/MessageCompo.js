import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import fontStyle from "../../assets/styles/FontStyle";
import {useFocusEffect} from "@react-navigation/native";
import appColors from "../../assets/colors/AppColors";

const MessageCompo = ({navigation}) => {
    const [allItems, setAllItems] = useState([]);

    async function loadMessages() {
        try {
            let messages = await AsyncStorage.getItem("Messages");
            if (messages) {
                messages = JSON.parse(messages);
                messages = messages.reverse();
                setAllItems(messages);
            } else
                setAllItems([]);

        } catch (e) {
            console.log(e)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadMessages();
        }, [])
    )

    useEffect(() => {
        loadMessages();
    }, []);
    return (
        <View>
            {
                allItems.length > 0 ?
                    <FlatList
                        data={allItems}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', {item: item})} style={{
                                flexDirection: 'row',
                                paddingTop: hp('2'),
                                paddingHorizontal: wp('2'),
                                width: wp('95'),
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={{uri: item.avatar}} style={{
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
                                        {
                                            item.reply ?
                                                // JSON.parse(item.reply).map((r, index) => {
                                                //     return (
                                                //         <Text key={index} style={{color: appColors.black}}>{r}</Text>
                                                //     )
                                                // })
                                                <Text
                                                    style={{color: appColors.black}}>{JSON.parse(item.reply)[2]}</Text>

                                                :
                                                <Text style={{color: appColors.black}}>{item.message}</Text>
                                        }

                                    </View>
                                </View>

                                {/*<View style={{*/}
                                {/*    height: hp('6'),*/}
                                {/*    width: hp('6'),*/}
                                {/*    justifyContent: 'center',*/}
                                {/*    alignItems: 'center'*/}
                                {/*}}>*/}
                                {/*    <Text style={{*/}
                                {/*        color: AppColors.black,*/}
                                {/*        textAlignVertical: 'center',*/}
                                {/*        textAlign: 'center',*/}
                                {/*        fontFamily: FontStyle.regularFont,*/}
                                {/*        fontSize: wp('3.5')*/}
                                {/*    }}>2:45</Text>*/}
                                {/*</View>*/}
                            </TouchableOpacity>
                        )}
                    /> :
                    <View style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                        <Text style={{fontFamily: fontStyle.boldFont, fontSize: 18, color: AppColors.black}}>No messages
                            found!</Text>
                    </View>
            }

        </View>
    );
};

export default MessageCompo;
  