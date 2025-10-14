
import SellerSignupForm from '@/components/auth/seller-signup-form';
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SellerSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create a Seller Account</CardTitle>
            <CardDescription>Monetize your excess solar energy.</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerSignupForm />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Looking to buy energy?{' '}
            <Link href="/signup/buyer" className="text-accent hover:underline">
                Sign up as a buyer
            </Link>
        </p>
      </div>
    </div>
  );
}

    