// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxIgMcVuztElL0pu9qwQsfre4sxHkw6OA",
  authDomain: "my-lmp-app.firebaseapp.com",
  projectId: "my-lmp-app",
  storageBucket: "my-lmp-app.firebasestorage.app",
  messagingSenderId: "764954248465",
  appId: "1:764954248465:web:452b82442bc763105c78b0",
  measurementId: "G-G0M6K403ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
