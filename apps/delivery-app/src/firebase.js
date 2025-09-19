// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "…",
  authDomain: "medshare-d0aa0.firebaseapp.com",
  projectId: "medshare-d0aa0",
  storageBucket: "medshare-d0aa0.appspot.com", // <- confirm in console
  messagingSenderId: "831990210036",
  appId: "1:831990210036:web:49e2200d08ce1d31d9ada1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
