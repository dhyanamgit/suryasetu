
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from 'firebase/auth';
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
    url: typeof window !== 'undefined' ? `${window.location.origin}/welcome` : 'http://localhost:9002/welcome',
    handleCodeInApp: true,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(true); // Start as true
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
            displayName: userData.displayName || firebaseUser.displayName || firebaseUser.email,
            role: userData.role || 'buyer',
          };
          setUser(appUser);
        } else {
           // This block handles new users, including those from magic links
           const newUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email,
            role: 'buyer' // Default new users to 'buyer'
           };
           await setDoc(userDocRef, { 
             displayName: newUser.displayName,
             email: firebaseUser.email, 
             role: 'buyer' 
           });
           setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setIsSigningIn(false); // Finished processing auth state change
    });

    // Check if the current URL is a sign-in link on initial load
    if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
        // We are on a magic link page, so we are in the process of signing in.
        // The /welcome page will handle the actual sign-in logic.
        // We set loading to true and isSigningIn to true to show the loader.
        setLoading(true);
        setIsSigningIn(true);
    } else {
        setIsSigningIn(false);
    }


    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setIsSigningIn(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const signUp = async (email: string, pass: string, name: string, role: UserRole) => {
    setIsSigningIn(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;

    await setDoc(doc(db, "users", firebaseUser.uid), {
        displayName: name,
        email: email,
        role: role
    });
    
    // Set user immediately after sign up to avoid race conditions with onAuthStateChanged
    const appUser: AppUser = {
        uid: firebaseUser.uid,
        email,
        displayName: name,
        role
    };
    setUser(appUser);
    return userCredential;
  };

  const signInWithMagicLink = async (email: string) => {
    setIsSigningIn(true);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    // Don't setLoading(false) here, as we are now waiting for user to click link
  };

  const completeSignInWithEmailLink = async (email: string, url: string) => {
      if (isSigningIn) return;
      setIsSigningIn(true);
      setLoading(true);
      try {
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
        // The onAuthStateChanged listener will handle setting the user and final loading states.
      } catch (error) {
          console.error("Error signing in with email link", error);
          setIsSigningIn(false);
          setLoading(false);
          throw error;
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
