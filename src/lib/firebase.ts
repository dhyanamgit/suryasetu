
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWcCuSyTqIw1up9xFIUDNfqFAolBVWywk",
  authDomain: "studio-1850346779-9c1cf.firebaseapp.com",
  projectId: "studio-1850346779-9c1cf",
  storageBucket: "studio-1850346779-9c1cf.appspot.com",
  messagingSenderId: "952353938825",
  appId: "1:952353938825:web:02c2a6da33c6f400481558"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
