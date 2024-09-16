import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image, ToastAndroid, Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontStyle from '../../assets/styles/FontStyle';
import {Icons} from '../../assets/styles/Icons';
import GradientLongButton from '../../components/gradients/GradientLongButton';
import Lottie from 'lottie-react-native';
import {GoogleSignin, isErrorWithCode, statusCodes} from "@react-native-google-signin/google-signin";
import {fetchSignInMethodsForEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {db, userAuth} from "../../../firebase";
import Loader from "../loader/Loader";
import {StackActions} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from 'react-native-raw-bottom-sheet';
import fontStyle from "../../assets/styles/FontStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Splash = ({navigation}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false)

    const refRBSheet = useRef();


    setTimeout(() => {
        setIsLoading(false);
    }, 1000);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '307284025985-srpolqrvosk56e6hkhur8qk1jirm8plr.apps.googleusercontent.com',
        });
    }, [])

    const signIn = async () => {
        try {
            if (isChecked) {
                setIsLoginLoading(true);
                await GoogleSignin.hasPlayServices();
                const user = await GoogleSignin.signIn();
                // console.log(user.user);
                setUserInfo(user.user);
                let userInformation = user.user;
                console.log(userInformation);
                console.log(userInformation.email);
                const res = await checkIfEmailRegistered(userInformation.email);
                console.log(res);
                if (!res) {
                    await CreateUser(userInformation);
                } else {
                    await loginSubmit(userInformation.email, "123456");
                }
                // submitLogin(userInformation.email, "", userInformation);
            } else {
                ToastAndroid.show("Please agree with our terms & conditions.", ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log(error);
            setIsLoginLoading(false);
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
                        // Android and Apple only. No saved credential found, try calling `createAccount`
                        break;
                    case statusCodes.SIGN_IN_CANCELLED:
                        // sign in was cancelled
                        ToastAndroid.show("Google Login Cancelled!", ToastAndroid.LONG);
                        break;
                    case statusCodes.ONE_TAP_START_FAILED:
                        // Android and Web only, you probably have hit rate limiting.
                        // On Android, you can still call `presentExplicitSignIn` in this case.
                        // On the web, user needs to click the `WebGoogleSigninButton` to sign in.
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android-only: play services not available or outdated
                        // Web: when calling an unimplemented api (requestAuthorization)
                        ToastAndroid.show("PlayService not available.", ToastAndroid.LONG);
                        break;
                    default:
                    // something else happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    };

    // useEffect(() => {
    //     checkIfEmailRegistered("itxfazitech@gmail.com");
    // }, [])

    const checkIfEmailRegistered = async (email) => {
        try {
            // Attempt to sign in with the email and a dummy password
            await signInWithEmailAndPassword(userAuth, email, '123456');
            // If the sign-in is successful, the email is registered (although this should not happen with an incorrect password)
            console.log('Email is registered.');
            return true;
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log('Email is not registered.');
                return false;
            } else if (error.code === 'auth/wrong-password') {
                console.log('Email is registered, but wrong password was provided.');
                return true;
            } else {
                console.error('Error checking email:', error);
                // Handle other errors here
                return false;
            }
        }
        // try {
        //     const methods = await fetchSignInMethodsForEmail(userAuth, 'itxfazitech@gmail.com'.toLowerCase());
        //     console.log(methods);
        //     return methods.length > 0;
        // } catch (error) {
        //     console.error('Error checking email:', error);
        //     // Handle errors here
        // }
    };

    function generateNumericCode(length) {
        let result = '';
        const digits = '0123456789';
        const digitsLength = digits.length;

        for (let i = 0; i < length; i++) {
            result += digits.charAt(Math.floor(Math.random() * digitsLength));
        }

        return result;
    }

    const CreateUser = async (user) => {
        try {
            let password = "123456";
            let code = generateNumericCode(6);
            await createUserWithEmailAndPassword(userAuth, user.email, password).then(async userCredentials => {
                // console.log(userCredentials.user.uid);
                // Assuming userCredentials.user.uid exists
                const uid = userCredentials.user.uid;

                // Create a reference to the document with the same ID as the uid
                const userDocRef = doc(db, "Users", uid);

                // Set the data for the document
                await setDoc(userDocRef, {
                    uid: uid,
                    id: code,
                    name: user.name,
                    email: user.email,
                    password: password,
                    avatar: user.photo,
                    age: "20",
                    gender: "Male",
                    level: "1",
                    gems: "0",
                    coin: "0",

                });
                await loginSubmit(user.email, password);
            })
        } catch (e) {
            console.log(e)
        }
    }

    const loginSubmit = async (email, password) => {
        try {
            await signInWithEmailAndPassword(userAuth, email, password).then(async UserCredentials => {
                const uid = UserCredentials.user.uid;
                const userDocRef = doc(db, "Users", uid);
                // Get the document snapshot
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                    // Document exists, retrieve the data
                    const userData = docSnapshot.data();
                    await AsyncStorage.setItem("UserId", userData.uid);
                    await AsyncStorage.setItem("Id", userData.id);
                    await AsyncStorage.setItem("UserName", userData.name);
                    await AsyncStorage.setItem("Email", userData.email);
                    await AsyncStorage.setItem("Avatar", userData.avatar);
                    await AsyncStorage.setItem("Age", userData.age);
                    await AsyncStorage.setItem("Gender", userData.gender);
                    await AsyncStorage.setItem("Level", userData.level);
                    await AsyncStorage.setItem("Coins", userData.coin);
                    await AsyncStorage.setItem("Gems", userData.gems);
                    setIsLoginLoading(false);
                    navigation.dispatch(StackActions.replace("TabScreens"));
                } else {
                    alert("No user exists. Please check your credentials.")
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log(error.code);
                if (error.code === "auth/invalid-credential") {
                    alert("User not found. Please check your credentials.");
                } else if (error.code === "auth/wrong-password") {
                    alert("Invalid password. Please try again.");
                } else if (error.code === "auth/too-many-requests") {
                    alert("Please try again later.You have already tried many times.")
                } else {
                    console.log("Error signing in:", error);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    function generateCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const FastLogin = async () => {
        try {
            if (isChecked) {
                setIsLoginLoading(true);
                let code = generateCode(6);
                let user = {
                    name: `Guest_${code}`,
                    email: `guest_${code}@gmail.com`,
                    photo: "https://image.winudf.com/v2/image1/Y29tLkFuaW1lQm95cy5Qcm9maWxlUGljdHVyZXNfaWNvbl8xNjkxODIzMjkwXzAxMA/icon.webp?w=140&fakeurl=1&type=.webp",
                }
                await CreateUser(user);
            } else {
                ToastAndroid.show("Please agree with our terms & conditions.", ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const DirectLogin = async () => {
        try {
            refRBSheet.current.close();
            setIsLoginLoading(true);
            let code = generateCode(6);
            let user = {
                name: `Guest_${code}`,
                email: `guest_${code}@gmail.com`,
                photo: "https://image.winudf.com/v2/image1/Y29tLkFuaW1lQm95cy5Qcm9maWxlUGljdHVyZXNfaWNvbl8xNjkxODIzMjkwXzAxMA/icon.webp?w=140&fakeurl=1&type=.webp",
            }
            await CreateUser(user);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <RBSheet
                ref={refRBSheet}
                // useNativeDriver={true}
                customStyles={{
                    container: {
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                        paddingVertical: 50,
                        paddingHorizontal: 30,
                        position: "relative",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                    },
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <Pressable style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 15,
                    right: 15,
                }} onPress={() => {
                    refRBSheet.current.close();
                }}>
                    <AntDesign name={'close'} size={17} color={'#000'}/>
                </Pressable>
                <Text style={{
                    fontFamily: fontStyle.boldFont,
                    fontSize: 23,
                    color: "#000",
                }}>Please read and agree to the following terms</Text>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontFamily: fontStyle.mediumFont,
                        fontSize: 14,
                        textDecorationLine: "underline",
                    }}>User Agreement </Text>
                    <Text style={{
                        fontFamily: fontStyle.regularFont,
                        fontSize: 14,
                    }}>and </Text>
                    <Text style={{
                        fontFamily: fontStyle.mediumFont,
                        fontSize: 14,
                        textDecorationLine: "underline",
                    }}>Privacy Policy</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: AppColors.blue,
                    width: "100%",
                    marginTop: 15,
                    paddingVertical: 11,
                    borderRadius: 25,
                }} onPress={async () => {
                    setIsChecked(true);
                    await DirectLogin();
                }}>
                    <Text style={{
                        fontFamily: fontStyle.semiBoldFont,
                        fontSize: 15,
                        color: "#fff",
                        textAlign: "center",
                    }}>Agree and Continue</Text>
                </TouchableOpacity>
            </RBSheet>
            <ImageBackground
                source={require('../../assets/images/home_bg.png')}
                // resizeMode='cover'
                style={{
                    height: hp('100'),
                    width: wp('100'),
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    // paddingBottom:hp('3')
                }}>
                <Loader isLoading={isLoginLoading}/>
                {isLoading ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Lottie
                            source={require('../../assets/animations/loading.json')}
                            autoPlay
                            loop
                            style={{height: hp('40'), width: wp('40')}}
                        />
                    </View>
                ) : (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <GradientLongButton title={'Fast Login'} onPress={() => {
                            refRBSheet.current.open()
                        }
                            // FastLogin()
                        }/>
                        {isClicked ? (
                            <View style={{width: wp('60')}}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: 20, // Adjust as needed
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: AppColors.black, // Adjust the color as needed
                                        }}
                                    />
                                    <Text
                                        style={{
                                            marginHorizontal: wp('1'), // Adjust as needed
                                            fontSize: wp('4'), // Adjust as needed
                                            color: AppColors.black, // Adjust the color as needed
                                            fontFamily: FontStyle.mediumFont,
                                        }}>
                                        or
                                    </Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: AppColors.black, // Adjust the color as needed
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => signIn()}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: AppColors.white,
                                                borderRadius: wp('5'),
                                                height: hp('5'),
                                                width: hp('5'),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            {/* <Icons.FontAwesome name="google" /> */}
                                            <Image
                                                source={require('../../assets/images/google-color-icon.png')}
                                                style={{height: hp('3'), width: hp('3')}}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                color: AppColors.white,
                                                fontFamily: FontStyle.regularFont,
                                                fontSize: wp('3'),
                                            }}>
                                            Google
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PhoneLogin')}>
                                        <View
                                            style={{
                                                backgroundColor: AppColors.white,
                                                borderRadius: wp('5'),
                                                height: hp('5'),
                                                width: hp('5'),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Icons.FontAwesome color={AppColors.black} name="mobile-phone"
                                                               size={wp('7')}/>
                                        </View>
                                        <Text
                                            style={{
                                                color: AppColors.white,
                                                fontFamily: FontStyle.regularFont,
                                                fontSize: wp('3'),
                                            }}>
                                            Phone
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        FastLogin();
                                    }}>
                                        <View
                                            style={{
                                                backgroundColor: AppColors.white,
                                                borderRadius: wp('5'),
                                                height: hp('5'),
                                                width: hp('5'),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Icons.FontAwesome5 color={AppColors.black} name="user-alt" size={wp('5')}/>
                                        </View>
                                        <Text
                                            style={{
                                                color: AppColors.white,
                                                fontFamily: FontStyle.regularFont,
                                                fontSize: wp('3'),
                                            }}>
                                            Guest
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={{flexDirection: 'row', marginVertical: hp('2')}}>
                                <Text
                                    style={{
                                        color: AppColors.white,
                                        fontFamily: FontStyle.mediumFont,
                                    }}>
                                    Already a member?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsClicked(true);
                                        setIsChecked(true);
                                    }}>
                                    <Text
                                        style={{
                                            color: AppColors.white,
                                            fontFamily: FontStyle.mediumFont,
                                        }}>
                                        {' '}
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={{flexDirection: 'row', marginVertical: hp('6')}}>
                            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                                <Icons.FontAwesome
                                    name={isChecked ? 'check-circle' : 'circle-o'}
                                    color={AppColors.white}
                                    size={wp('5')}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: AppColors.grey,
                                    fontFamily: FontStyle.regularFont,
                                    fontSize: wp('3.5'),
                                }}>
                                {' '}
                                Agree to
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        color: AppColors.white,
                                        fontFamily: FontStyle.semiBoldFont,
                                        fontSize: wp('3.5'),
                                    }}>
                                    {' '}
                                    User Agreement
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: AppColors.grey,
                                    fontFamily: FontStyle.regularFont,
                                    fontSize: wp('3.5'),
                                }}>
                                {' '}
                                and
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        color: AppColors.white,
                                        fontFamily: FontStyle.semiBoldFont,
                                        fontSize: wp('3.5'),
                                    }}>
                                    {' '}
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ImageBackground>
        </>
    );
};

export default Splash;
