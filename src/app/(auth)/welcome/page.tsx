
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
  const [status, setStatus] = useState('processing'); // 'processing', 'animating', 'redirecting'

  useEffect(() => {
    // This effect handles the magic link processing.
    if (status !== 'processing') return;

    const link = window.location.href;
    if (isSignInWithEmailLink(auth, link)) {
      const email = window.localStorage.getItem('emailForSignIn');
      if (email) {
        completeSignInWithEmailLink(email, link).catch(error => {
          console.error("Failed to sign in with email link", error);
          router.replace('/login');
        });
        // The onAuthStateChanged listener in useAuth will handle the next steps.
      } else {
        // Email not found means different browser/device.
        router.replace('/login');
      }
    } else {
        // If it's not a magic link, we rely on the next effect to check the user's auth state.
        if (!isSigningIn && !loading) {
            if (user) {
                setStatus('animating');
            } else {
                router.replace('/login');
            }
        }
    }
  }, [completeSignInWithEmailLink, router, status, isSigningIn, loading, user]);

  useEffect(() => {
    // This effect transitions from processing to animating once the user is available.
    if (status === 'processing' && !loading && !isSigningIn && user) {
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
  
  // Show a loading spinner during the initial processing phase.
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
