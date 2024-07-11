import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3i9XtQU5d3DvknWwMNDpO1f21XXs7w10",
  authDomain: "task-manager-d8973.firebaseapp.com",
  projectId: "task-manager-d8973",
  storageBucket: "task-manager-d8973.appspot.com",
  messagingSenderId: "1010144125656",
  appId: "1:1010144125656:web:e050eda853132be399edad",
  measurementId: "G-YX33PZHE2H"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

