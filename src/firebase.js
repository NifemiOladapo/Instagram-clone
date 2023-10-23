import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4Dzs8Ala4V5NGzlREanPX-VRg8ixKwW0",
  authDomain: "instagram-clone-227e0.firebaseapp.com",
  projectId: "instagram-clone-227e0",
  storageBucket: "instagram-clone-227e0.appspot.com",
  messagingSenderId: "229424080595",
  appId: "1:229424080595:web:d5cb19f5456daaadcb9626",
  measurementId: "G-1360NKYDZM",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage()

export { auth, db, storage };
