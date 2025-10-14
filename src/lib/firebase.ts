import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// This configuration is now correctly set up for your project.
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "studio-1850346779-9c1cf.firebaseapp.com",
  projectId: "studio-1850346779-9c1cf",
  storageBucket: "studio-1850346779-9c1cf.appspot.com",
  messagingSenderId: "1073534538314",
  appId: "1:1073534538314:web:e4f9b4e69b5d3c3a4a3a3b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
