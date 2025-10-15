
import MagicLinkForm from '@/components/auth/magic-link-form';
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
            <CardDescription>Enter your email to receive a magic sign-in link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MagicLinkForm />
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
