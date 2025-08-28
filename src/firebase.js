// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKAU-j-h5_5InETparcyhkfsBTFpqxWBE",
  authDomain: "medshare-d0aa0.firebaseapp.com",
  projectId: "medshare-d0aa0",
  storageBucket: "medshare-d0aa0.appspot.com",
  messagingSenderId: "831990210036",
  appId: "1:831990210036:web:a43c741a2a90a71fd9ada1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
