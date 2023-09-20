// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTxNmzjSUpc5JNpotKUm_WGFf8qinrUyE",
  authDomain: "mentalhealth-20340.firebaseapp.com",
  projectId: "mentalhealth-20340",
  storageBucket: "mentalhealth-20340.appspot.com",
  messagingSenderId: "1092413338670",
  appId: "1:1092413338670:web:7d29fee9958b582bc05bbf",
  measurementId: "G-DCTJD8VM77"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

