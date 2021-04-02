import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
    apiKey: process.env.REACT_FIREBASE_apiKey,
    authDomain: process.env.REACT_FIREBASE_authDomain,
    databaseURL: process.env.REACT_FIREBASE_databaseURL,
    projectId: process.env.REACT_FIREBASE_projectId,
    storageBucket: process.env.REACT_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_FIREBASE_messagingSenderId,
    appId: process.env.REACT_FIREBASE_appId,
    measurementId: process.env.REACT_FIREBASE_measurementId,
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);

const fbStorage = fbApp.storage();

export { fbStorage };
