"use client";

import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const Icon = mounted && theme === 'dark' ? Sun : Moon;

  return (
    <div className={cn("flex items-center gap-2 text-foreground", className)}>
      <button onClick={toggleTheme} className="bg-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
        <span className="sr-only">Toggle theme</span>
        <Icon className="h-5 w-5 text-primary-foreground" />
      </button>
      <span className="font-bold text-xl font-headline">SuryaSetu</span>
    </div>
  );
};

export default Logo;
