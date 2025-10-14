"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// To implement real authentication, you would use the Firebase auth instance
// import { auth, db } from '@/lib/firebase';
// import { onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// MOCKED IMPLEMENTATION: Replace with real Firebase calls
const FAKE_DELAY = 1000;
const MOCKED_USERS: Record<string, AppUser> = {
  'buyer@test.com': { uid: 'buyer123', email: 'buyer@test.com', displayName: 'Test Buyer', role: 'buyer' },
  'seller@test.com': { uid: 'seller123', email: 'seller@test.com', displayName: 'Test Seller', role: 'seller' },
  'admin@test.com': { uid: 'admin123', email: 'admin@test.com', displayName: 'Super Admin', role: 'superadmin' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This simulates checking if a user is logged in on app load.
    // In a real app, you would use onAuthStateChanged here.
    const checkUser = () => {
      try {
        const storedUser = sessionStorage.getItem('surya-setu-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        sessionStorage.removeItem('surya-setu-user');
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    console.log(`Attempting to sign in with ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCKED_USERS[email];
        if (foundUser) {
          setUser(foundUser);
          sessionStorage.setItem('surya-setu-user', JSON.stringify(foundUser));
          setLoading(false);
          console.log('Sign in successful');
          resolve({ user: foundUser });
        } else {
          setLoading(false);
          console.log('Sign in failed: User not found');
          reject(new Error('User not found or password incorrect.'));
        }
      }, FAKE_DELAY);
    });
  };
  
  const signUp = async (email: string, pass: string, name: string, role: UserRole) => {
    setLoading(true);
    console.log(`Attempting to sign up with ${email}, role ${role}`);
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCKED_USERS[email]) {
          setLoading(false);
          reject(new Error('An account with this email already exists.'));
        } else {
          const newUser: AppUser = { uid: `new-${Date.now()}`, email, displayName: name, role };
          MOCKED_USERS[email] = newUser;
          setUser(newUser);
          sessionStorage.setItem('surya-setu-user', JSON.stringify(newUser));
          setLoading(false);
          console.log('Sign up successful');
          resolve({ user: newUser });
        }
      }, FAKE_DELAY);
    });
  };

  const signOut = async () => {
    setLoading(true);
    console.log('Signing out');
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        sessionStorage.removeItem('surya-setu-user');
        setLoading(false);
        router.push('/login');
        console.log('Sign out complete');
        resolve();
      }, FAKE_DELAY / 2);
    });
  };

  const value = { user, loading, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
