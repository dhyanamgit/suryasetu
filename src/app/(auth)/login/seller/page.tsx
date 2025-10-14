
import SellerLoginForm from '@/components/auth/seller-login-form';
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SellerLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Seller Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerLoginForm />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Not a seller?{' '}
            <Link href="/login/buyer" className="text-accent hover:underline">
                Login as a buyer
            </Link>
        </p>
      </div>
    </div>
  );
}

    