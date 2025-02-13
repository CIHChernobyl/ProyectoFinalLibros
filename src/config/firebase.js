import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkyYC01pfTlGkm9cAwrCkRSCqTqeSuuAY-uR4csHw",
  authDomain: "final-f1daf.firebaseapp.com",
  projectId: "final-f1daf",
  storageBucket: "final-f1daf.firebasestorage.app",
  messagingSenderId: "510788944354",
  appId: "1:510788944354:android:8d2399024b24b1bbf639bb",
  measurementId: "G-9MBVEBS5D1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
