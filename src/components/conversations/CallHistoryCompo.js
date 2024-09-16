import {
    View, Text, FlatList, Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import GradientCircle from '../../components/gradients/GradientCircle';
import GradientView from '../../components/gradients/GradientView';
import fontStyle from "../../assets/styles/FontStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoModal from "../modals/VideoModal";

const CallHistoryCompo = ({navigation}) => {

    const [allItems, setAllItems] = useState([]);
    const [videoModalAvatar, setVideoModalAvatar] = useState('');
    const [videoModal, setVideoModal] = useState(false);

    async function loadCallHistory() {
        let callHistory = await AsyncStorage.getItem("CallHistory");
        if (callHistory) {
            callHistory = JSON.parse(callHistory);
            callHistory = callHistory.reverse();
            // console.log(callHistory);
            setAllItems(callHistory);
        } else
            setAllItems([]);
    }

    useEffect(() => {
        loadCallHistory();
    }, []);
    return (<View>
            {allItems.length > 0 ? <FlatList
                data={allItems}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (<View style={{
                    flexDirection: 'row',
                    paddingTop: hp('2'),
                    paddingHorizontal: wp('2'),
                    width: wp('95'),
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: item.call.avatar}} style={{
                            height: hp('8'), width: hp('8'), borderRadius: 100, marginRight: wp('4')
                        }}/>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{
                                fontFamily: FontStyle.mediumFont, fontSize: wp('4.8'), color: AppColors.black
                            }}>{item.call.name}</Text>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: FontStyle.regularFont,
                                    fontSize: wp('3.5'),
                                    marginLeft: wp('1'),
                                    color: AppColors.black
                                }}>{item.time}</Text>
                            </View>
                        </View>
                    </View>
                    <GradientView>
                        <GradientCircle
                            onPress={() => {
                                setVideoModalAvatar(item.call.avatar);
                                setVideoModal(true);
                            }}
                            height={hp('3.5')} width={hp('3.5')} icoType={Icons.FontAwesome5}
                            iconColor={AppColors.white} iconName={"video"} iconSize={wp('4')}/>
                    </GradientView>
                </View>)}
            /> : <View style={{
                display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%",
            }}>
                <Text style={{fontFamily: fontStyle.boldFont, fontSize: 18,color : AppColors.black}}>No call history found!</Text>
            </View>}

            <VideoModal navigation={navigation} avatar={videoModalAvatar} isVisible={videoModal}
                        setIsVisible={setVideoModal}/>
        </View>

    );
};

export default CallHistoryCompo;
  