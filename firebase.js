import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBRhvq2vKZlbNeU-TyklQrbwEoCNSQP8IE",
  authDomain: "livmeetup-1a3ee.firebaseapp.com",
  projectId: "livmeetup-1a3ee",
  storageBucket: "livmeetup-1a3ee.appspot.com",
  messagingSenderId: "249135078070",
  appId: "1:249135078070:web:fa8b51ea7acca6f5e16417"
};

let app;
app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export {db, userAuth};
