
import MagicLinkForm from '@/components/auth/magic-link-form';
import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function BuyerSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline">Create a Buyer Account</CardTitle>
            <CardDescription>Enter your email to get started with a magic link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MagicLinkForm />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Want to sell energy instead?{' '}
            <Link href="/signup/seller" className="text-accent hover:underline">
                Sign up as a seller
            </Link>
        </p>
      </div>
    </div>
  );
}
