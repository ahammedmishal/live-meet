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
  const Hot = () => {
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
        {/* <View
          style={{
            flexDirection: 'row',
            width: wp('28'),
            justifyContent: 'space-between',
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
                  }
                : {
                    borderBottomColor: AppColors.white,
                    borderBottomWidth: wp('0.5'),
                  },
            ]}>
            <Text
              style={{
                fontFamily: FontStyle.mediumFont,
                fontSize: wp('4'),
                color: AppColors.black,
              }}>
              Hot
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
                fontFamily: FontStyle.mediumFont,
                fontSize: wp('4'),
                color: AppColors.black,
              }}>
              Nearby
            </Text>
          </TouchableOpacity>
        </View> */}
       <FlatList
          data={allItems}
          numColumns={'2'}
          renderItem={({item}) => (
            <View style={{height: hp('33'), width: wp('48')}}>
              <ImageBackground
                source={item.image}
                imageStyle={{
                  height: hp('32'),
                  width: wp('45'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp('3'),
                }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: hp('-33'),
                    paddingLeft: wp('3'),
                    width: wp('45'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: wp('22'), height: hp('6')}}>
                    <Text
                      style={{
                        fontFamily: FontStyle.boldFont,
                        color: AppColors.white,
                      }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: wp('9'),
                      }}>
                      <View
                        style={{
                          height: hp('2'),
                          width: hp('2'),
                          backgroundColor: AppColors.primary,
                          borderRadius: 100,
                        }}></View>
                      <View
                        style={{
                          height: hp('2'),
                          width: hp('2'),
                          backgroundColor: 'pink',
                          borderRadius: 100,
                        }}></View>
                    </View>
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
                      <GradientCircle height={hp('6')} width={hp('6')} icoType={Icons.FontAwesome5} iconColor={AppColors.white} iconName={"video"} iconSize={wp('6')}/>
                    {/* <Icons.FontAwesome5
                      name="video"
                      size={wp('6')}
                      color={AppColors.white}
                      style={{
                        paddingTop: wp('3'),
                        paddingLeft: wp('3'),
                        height: hp('6'),
                        width: hp('6'),
                        backgroundColor: 'pink',
                        borderRadius: 100,
                      }}
                    /> */}
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      </View>
    );
  };
  
  export default Hot;
  