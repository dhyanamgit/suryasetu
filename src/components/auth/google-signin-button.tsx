
"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 55.9L373.9 119.4c-23.3-22.5-58.4-37.3-95.9-37.3-83.8 0-152.2 68.3-152.2 152.2s68.4 152.2 152.2 152.2c91.1 0 134.1-63.4 139.7-94.8H248v-69.2h239.2c1.2 12.8 2 25.8 2 39.8z"></path>
    </svg>
);


export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Sign In Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
       toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={isLoading} className="w-full" variant="outline">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon />
      )}
      Sign in with Google
    </Button>
  );
}
