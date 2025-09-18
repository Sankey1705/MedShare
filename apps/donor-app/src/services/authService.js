import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register new user
export const registerUser = async (email, password, name, role) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // Store extra details in Firestore "users" collection
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role, // donor / receiver
    createdAt: new Date()
  });

  return user;
};

// Login user
export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};
