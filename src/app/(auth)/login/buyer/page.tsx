

import GoogleSignInButton from '@/components/auth/google-signin-button';
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function BuyerLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline">Buyer Login</CardTitle>
            <CardDescription>Sign in to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleSignInButton />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Not a buyer?{' '}
            <Link href="/login/seller" className="text-accent hover:underline">
                Login as a seller
            </Link>
        </p>
      </div>
    </div>
  );
}
