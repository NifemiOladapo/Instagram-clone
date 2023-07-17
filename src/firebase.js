import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAcxo6HjSBCmuK6b9Z7H12jLG6A71HcbM",
  authDomain: "instagram-clone-8c0cd.firebaseapp.com",
  projectId: "instagram-clone-8c0cd",
  storageBucket: "instagram-clone-8c0cd.appspot.com",
  messagingSenderId: "392774347072",
  appId: "1:392774347072:web:660ced0726b35bf388b2a5",
  measurementId: "G-P0ZXBQQEDS",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
