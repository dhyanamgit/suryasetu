
'use client';

import WelcomeAnimation from '@/components/welcome-animation';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { isSignInWithEmailLink } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading, completeSignInWithEmailLink, isSigningIn } = useAuth();
  const [isProcessingLink, setIsProcessingLink] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const link = window.location.href;
    if (isSignInWithEmailLink(auth, link)) {
      const email = window.localStorage.getItem('emailForSignIn');
      
      if (email) {
        completeSignInWithEmailLink(email, link).catch(error => {
          console.error("Failed to sign in with email link", error);
          // If there's an error (e.g., link expired), send to login
          router.replace('/login');
        });
      } else {
        // Email not found in storage. This happens on a different device/browser.
        // Instead of prompting, redirect to login to restart the flow.
        router.replace('/login');
      }
    } else {
      // Not a magic link, proceed to check auth state
      setIsProcessingLink(false);
    }
  }, [completeSignInWithEmailLink, router]);
  
  useEffect(() => {
    // This effect runs once the auth state is confirmed and any link has been processed
    if (!loading && !isSigningIn) {
      if (user) {
        // User is logged in, prepare to show animation or redirect.
        setIsProcessingLink(false);
        setShowAnimation(true);
      } else if (!isProcessingLink) {
        // If not logged in and not in the middle of processing a link, go to login.
        router.replace('/login');
      }
    }
  }, [user, loading, isSigningIn, isProcessingLink, router]);


  // Show a loading spinner while processing the magic link or waiting for the auth state
  if (isProcessingLink || loading || isSigningIn) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Once loading is done and we have a user, show the animation
  if (showAnimation) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
        <WelcomeAnimation onAnimationComplete={() => router.replace('/dashboard')} />
      </div>
    );
  }

  // Fallback, in case user is not logged in after all checks, redirect.
  // This state should ideally not be reached if logic is correct.
  if (!user && !loading && !isProcessingLink && !isSigningIn) {
    router.replace('/login');
  }

  return null;
}
