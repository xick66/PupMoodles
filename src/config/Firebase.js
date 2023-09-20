// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbTohVQRM3fInV05HOI6qAssUhoxZhok4",
  authDomain: "pupmoodles.firebaseapp.com",
  projectId: "pupmoodles",
  storageBucket: "pupmoodles.appspot.com",
  messagingSenderId: "660527497440",
  appId: "1:660527497440:web:5e1ed99bb4c3c46124d085",
  measurementId: "G-QERPJL15RQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

