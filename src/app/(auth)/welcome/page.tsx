
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
  const [status, setStatus] = useState('processing'); // 'processing', 'animating'

  useEffect(() => {
    // Only run this logic once on component mount
    if (status !== 'processing') return;

    const link = window.location.href;
    if (isSignInWithEmailLink(auth, link)) {
      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // If email is missing, the link was likely opened on another device.
        // Redirect to login to restart the process safely.
        router.replace('/login');
        return;
      }
      
      // We have the email and the link, attempt to sign in.
      // The `completeSignInWithEmailLink` function sets `isSigningIn`.
      // We don't need to do anything else here; the next effect will handle the user state.
      completeSignInWithEmailLink(email, link).catch(error => {
        console.error("Failed to sign in with email link", error);
        router.replace('/login'); // On failure, send to login
      });

    } else if (!loading && !isSigningIn) {
      // This handles cases where user is already logged in and revisits /welcome
      if (user) {
        setStatus('animating');
      } else {
        // Not a magic link and not logged in.
        router.replace('/login');
      }
    }

  }, [status, loading, isSigningIn, user, completeSignInWithEmailLink, router]);


  useEffect(() => {
    // This effect's only job is to transition to the animation
    // once we have a confirmed user and are no longer in the middle of auth operations.
    if (status === 'processing' && user && !loading && !isSigningIn) {
      setStatus('animating');
    }
  }, [user, loading, isSigningIn, status]);


  if (status === 'animating') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
        <WelcomeAnimation onAnimationComplete={() => router.replace('/dashboard')} />
      </div>
    );
  }
  
  // Show a loading spinner for all other states (initial load, processing link)
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="sr-only">Loading...</p>
    </div>
  );
}
