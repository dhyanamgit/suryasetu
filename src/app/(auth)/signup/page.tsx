
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Building } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Join the solar revolution today. Are you a buyer or a seller?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/signup/buyer">
                <User className="mr-2 h-5 w-5" /> Sign up as a Buyer
              </Link>
            </Button>
            <Button asChild className="w-full" size="lg" variant="secondary">
              <Link href="/signup/seller">
                <Building className="mr-2 h-5 w-5" /> Sign up as a Seller
              </Link>
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline">
                Log in
            </Link>
        </p>
      </div>
    </div>
  );
}

    