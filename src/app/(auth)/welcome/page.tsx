
'use client';

import WelcomeAnimation from '@/components/welcome-animation';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { isSignInWithEmailLink } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading, completeSignInWithEmailLink, isSigningIn } = useAuth();
  const [isProcessingLink, setIsProcessingLink] = useState(true);

  useEffect(() => {
    const processMagicLink = async () => {
      const link = window.location.href;
      if (isSignInWithEmailLink(auth, link)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // This can happen if the user opens the link on a different device.
          // We can prompt the user for their email.
          email = window.prompt('Please provide your email for confirmation');
        }
        if (email) {
          try {
            await completeSignInWithEmailLink(email, link);
            // The onAuthStateChanged listener in AuthProvider will handle the rest
          } catch (error) {
            console.error("Failed to sign in with email link", error);
            router.replace('/login');
          }
        } else {
          // No email provided
           router.replace('/login');
        }
      } else {
        setIsProcessingLink(false);
      }
    };

    processMagicLink();
  }, [completeSignInWithEmailLink, router]);
  
  useEffect(() => {
    // This effect runs once the auth state is confirmed
    if (!loading && !isSigningIn) {
      if (user) {
        // If we processed a link, we don't want to show the animation, just go to dashboard
         if (!isSignInWithEmailLink(auth, window.location.href)) {
           const animationTimer = setTimeout(() => {
             router.replace('/dashboard');
           }, 2000); // Duration of welcome animation before redirect
           return () => clearTimeout(animationTimer);
         } else {
            router.replace('/dashboard');
         }
      } else if (!isProcessingLink) {
        // If not logged in and not processing a link, go to login
        router.replace('/login');
      }
    }
  }, [user, loading, router, isProcessingLink, isSigningIn]);

  // Show a loading spinner while processing the link or waiting for auth state
  if (loading || isSigningIn || isProcessingLink) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Only show the animation if we are not processing a magic link
  if (user && !isSignInWithEmailLink(auth, window.location.href)) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
        <WelcomeAnimation onAnimationComplete={() => router.replace('/dashboard')} />
      </div>
    );
  }

  return null; // Fallback
}
