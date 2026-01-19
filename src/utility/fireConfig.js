// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUI21X38bXp5xvYHD3cRl8A9QiPghN2B4",
  authDomain: "canvas-9d5c8.firebaseapp.com",
  projectId: "canvas-9d5c8",
  storageBucket: "canvas-9d5c8.firebasestorage.app",
  messagingSenderId: "125715439373",
  appId: "1:125715439373:web:7c4eca6537b4cedd5dda44",
  measurementId: "G-0YK941NY5D",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
