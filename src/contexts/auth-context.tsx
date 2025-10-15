
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export type UserRole = 'buyer' | 'seller' | 'superadmin';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string, name: string, role: UserRole) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  isSigningIn: boolean;
  completeSignInWithEmailLink: (email: string, url: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) must be
    // in the Authorized Domains list in the Firebase Console.
    url: typeof window !== 'undefined' ? `${window.location.origin}/welcome` : 'http://localhost:9002/welcome',
    // This must be true.
    handleCodeInApp: true,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const appUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.displayName,
            role: userData.role || 'buyer',
          };
          setUser(appUser);
        } else {
           const newUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'buyer'
           };
           await setDoc(userDocRef, { 
             displayName: firebaseUser.displayName || firebaseUser.email, 
             email: firebaseUser.email, 
             role: 'buyer' 
           });
           setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass).finally(() => setLoading(false));
  };
  
  const signUp = async (email: string, pass: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const firebaseUser = userCredential.user;

        await setDoc(doc(db, "users", firebaseUser.uid), {
            displayName: name,
            email: email,
            role: role
        });
        
        return userCredential;
    } finally {
        setLoading(false);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    setLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
    } finally {
      setLoading(false);
    }
  };

  const completeSignInWithEmailLink = async (email: string, url: string) => {
      setIsSigningIn(true);
      try {
        const result = await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        // The onAuthStateChanged listener will handle setting the user and redirecting.
        return;
      } finally {
        setIsSigningIn(false);
      }
  }

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    router.push('/login');
  };

  const value = { user, loading, signIn, signUp, signOut, signInWithMagicLink, isSigningIn, completeSignInWithEmailLink };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
