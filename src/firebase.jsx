// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAop20dwJTIotX9-1mJuSdAF1AdXHN7Uzo",
    authDomain: "sustainabite-f460e.firebaseapp.com",
    projectId: "sustainabite-f460e",
    storageBucket: "sustainabite-f460e.appspot.com",
    messagingSenderId: "913546872254",
    appId: "1:913546872254:web:e144a5ff87da18795be5ef",
    measurementId: "G-1ZXPJSYQW0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default db;
