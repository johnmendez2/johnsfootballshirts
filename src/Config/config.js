import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCVeAq4bUtZveRy-ciyg4ij5OJ3u2dfsY",
    authDomain: "johnsfootballshirts.firebaseapp.com",
    projectId: "johnsfootballshirts",
    storageBucket: "johnsfootballshirts.appspot.com",
    messagingSenderId: "1036131164822",
    appId: "1:1036131164822:web:a89da054c03b8bd19118b7",
    measurementId: "G-H1P4VNFRLY"
  };



// Use this to initialize the firebase App
firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const fs = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {auth, fs, storage}
