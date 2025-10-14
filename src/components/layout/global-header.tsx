
"use client";

import React from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export default function GlobalHeader() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
        <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Logo />
            </Link>
          </div>
          <div className="flex lg:flex-1 lg:justify-end gap-x-4">
            {!loading && (
              <>
                {user ? (
                    <Button asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                ) : (
                  <>
                    <Button asChild variant="ghost">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </header>
  );
}
