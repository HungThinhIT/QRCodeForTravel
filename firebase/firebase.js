import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

let app;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcH9iGfbmP1Xzx8j5OB1wNyGTkHoCAvmk",
    authDomain: "qrtravel-vku.firebaseapp.com",
    projectId: "qrtravel-vku",
    storageBucket: "qrtravel-vku.appspot.com",
    messagingSenderId: "138826178666",
    appId: "1:138826178666:web:62961ee1ec17c2899faa13",
    measurementId: "G-9ZZVLC2KNJ"
};

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

export {db, auth, storage};
