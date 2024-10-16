// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBLiSWDogxnHgOYW7DC05UmEVv_O-sniFY",
    authDomain: "myapp-fe0a5.firebaseapp.com",
    projectId: "myapp-fe0a5",
    storageBucket: "myapp-fe0a5.appspot.com",
    messagingSenderId: "185797597842",
    appId: "1:185797597842:web:b90942491af1bec0fc244b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const imgDb = getStorage(app);
const txtDb = db

export { auth, db, imgDb, txtDb };




