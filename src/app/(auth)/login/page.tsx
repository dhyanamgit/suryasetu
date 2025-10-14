
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Building } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">How would you like to log in?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/login/buyer">
                <User className="mr-2 h-5 w-5" /> Login as a Buyer
              </Link>
            </Button>
            <Button asChild className="w-full" size="lg" variant="secondary">
              <Link href="/login/seller">
                <Building className="mr-2 h-5 w-5" /> Login as a Seller
              </Link>
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-accent hover:underline">
                Sign up
            </Link>
        </p>
      </div>
    </div>
  );
}

    