// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKAU-j-h5_5InETparcyhkfsBTFpqxWBE",
  authDomain: "medshare-d0aa0.firebaseapp.com",
  projectId: "medshare-d0aa0",
  storageBucket: "medshare-d0aa0.appspot.com", // storage still required in config, but we won't use it
  messagingSenderId: "831990210036",
  appId: "1:831990210036:web:a43c741a2a90a71fd9ada1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);  // ✅ used with react-firebase-hooks/auth
export const db = getFirestore(app);

export default app;
