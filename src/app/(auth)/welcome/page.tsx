
'use client';

import WelcomeAnimation from '@/components/welcome-animation';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const handleAnimationComplete = () => {
    // Redirect to the appropriate dashboard based on user role
    if (user) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
      <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
    </div>
  );
}
