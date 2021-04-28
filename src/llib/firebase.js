import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyAtG-9IZ6HOKlnq61zie5gexiXLsHLCAoc",
  authDomain: "instagramclone-fafa9.firebaseapp.com",
  projectId: "instagramclone-fafa9",
  storageBucket: "instagramclone-fafa9.appspot.com",
  messagingSenderId: "599977345713",
  appId: "1:599977345713:web:f45264430fed4a880a5890",
  // measurementId: "G-53QCSHMSRV"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// seedDatabase(firebase);
export { firebase, FieldValue };
