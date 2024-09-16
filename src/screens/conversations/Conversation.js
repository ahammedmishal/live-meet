import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import { Icons } from '../../assets/styles/Icons';
import GradientCircle from '../../components/gradients/GradientCircle';
import GradientView from '../../components/gradients/GradientView';
import MessageCompo from '../../components/conversations/MessageCompo';
import CallHistoryCompo from '../../components/conversations/CallHistoryCompo';
  
  const Conversation = ({navigation}) => {
    const [allItems, setAllItems] = useState([
      {image: require('../../assets/images/livMetSplash.jpg'), name: 'guest'},
      {image: require('../../assets/images/livMetSplash.jpg'), name: 'guest'},
      {image: require('../../assets/images/livMetSplash.jpg'), name: 'guest'},
    ]);
    const [topTab, setTopTab] = useState(true);
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp('3'),
          paddingVertical: hp('3'),
          paddingTop:hp('7'),
          backgroundColor: AppColors.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // width: wp('34'),
            // justifyContent: 'space-between',
            paddingHorizontal: wp('1'),
            paddingBottom: hp('1.5'),
          }}>
          <TouchableOpacity
            onPress={() => setTopTab(true)}
            style={[
              topTab == true
                ? {
                    borderBottomColor: AppColors.black,
                    borderBottomWidth: wp('0.5'),
                    // width:wp('2')
                    // marginRight:wp('-5')
                  }
                : {
                    borderBottomColor: AppColors.white,
                    borderBottomWidth: wp('0.5'),
                  },
            ]}>
            <Text
              style={{
                fontFamily: FontStyle.boldFont,
                fontSize: wp('4'),
                color: AppColors.black,
                marginRight:wp('5')
              }}>
              Messages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTopTab(false)}
            style={[
              topTab == false
                ? {
                    borderBottomColor: AppColors.black,
                    borderBottomWidth: wp('0.5'),
                  }
                : {
                    borderBottomColor: AppColors.white,
                    borderBottomWidth: wp('0.5'),
                  },
            ]}>
            <Text
              style={{
                fontFamily: FontStyle.boldFont,
                fontSize: wp('4'),
                color: AppColors.black,
              }}>
              Call History
            </Text>
          </TouchableOpacity>
        </View>
        {topTab?
        <MessageCompo navigation={navigation}/>
        :
        <CallHistoryCompo navigation={navigation}/>
        }
        {/* <FlatList
        data={allItems}
        renderItem={({item})=>(
          <View style={{flexDirection:'row',paddingTop:hp('2'),paddingHorizontal:wp('2'),width:wp('95'),justifyContent:'space-between'}}>
  <View style={{flexDirection:'row'}}>
  <Image source={item.image} style={{height:hp('8'),width:hp('8'),borderRadius:100,marginRight:wp('4')}}/>
  <View style={{justifyContent:'center',alignItems:'flex-start'}}>
  <Text style={{fontFamily:FontStyle.mediumFont,fontSize:wp('4.8'),color:AppColors.black}}>{item.name}</Text>
  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  <Icons.Ionicons name='location-sharp' size={wp('4')} color={AppColors.grey}/>
  <Text style={{fontFamily:FontStyle.regularFont,fontSize:wp('3.5'),marginLeft:wp('1'),color:AppColors.grey}}>{'307 4km'}</Text>
  </View>
  </View>
  </View>
  <GradientView>
  <GradientCircle height={hp('3.5')} width={hp('3.5')} icoType={Icons.FontAwesome5} iconColor={AppColors.white} iconName={"video"} iconSize={wp('4')}/>
  </GradientView>
          </View>
        )}
        /> */}

      </View>
    );
  };
  
  export default Conversation;
  