/** @format */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6RYin2JJ3yYpPtQwThy9-tSEI9nJb8Mk",
  authDomain: "react-slack-dev-715cb.firebaseapp.com",
  projectId: "react-slack-dev-715cb",
  storageBucket: "react-slack-dev-715cb.appspot.com",
  messagingSenderId: "643813231675",
  appId: "1:643813231675:web:b060c75f9051cca58fe01e",
  measurementId: "G-LHCE9MHXT3",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
