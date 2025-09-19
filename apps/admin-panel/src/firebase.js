// src/firebase.js (Admin app)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions"; // for role management

// ⚠️ Double-check storageBucket value in Firebase Console!
// It’s usually "<project-id>.appspot.com"
const firebaseConfig = {
  apiKey: "AIzaSyAKAU-j-h5_5InETparcyhkfsBTFpqxWBE",
  authDomain: "medshare-d0aa0.firebaseapp.com",
  projectId: "medshare-d0aa0",
  storageBucket: "medshare-d0aa0.appspot.com", // <- confirm in console!
  messagingSenderId: "831990210036",
  appId: "1:831990210036:web:f50bac684c545bbad9ada1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
