import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcH9iGfbmP1Xzx8j5OB1wNyGTkHoCAvmk",
    authDomain: "qrtravel-vku.firebaseapp.com",
    databaseURL: "https://qrtravel-vku-default-rtdb.firebaseio.com",
    projectId: "qrtravel-vku",
    storageBucket: "qrtravel-vku.appspot.com",
    messagingSenderId: "138826178666",
    appId: "1:138826178666:web:62961ee1ec17c2899faa13",
    measurementId: "G-9ZZVLC2KNJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase, storage, firestore, auth };
