// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTdWqMF2VfsqLY2u8eb4Tj7yPkk6kYT8M",
  authDomain: "mockmate-d8369.firebaseapp.com",
  projectId: "mockmate-d8369",
  storageBucket: "mockmate-d8369.firebasestorage.app",
  messagingSenderId: "188372819686",
  appId: "1:188372819686:web:fabad9bdf1e05e2a1da527",
  measurementId: "G-Q2JE28F3DF"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);