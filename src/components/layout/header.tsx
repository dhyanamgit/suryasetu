"use client";

import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ChevronDown, Menu as MenuIcon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

function getTitle(pathname: string, role: string | undefined): string {
    if (pathname.includes('dashboard')) {
        if (!role) return 'Dashboard';
        return `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
    }
    return "SuryaSetu";
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const avatarImage = PlaceHolderImages.find((p) => p.id === 'user-avatar');
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-muted-foreground lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
            <h1 className="text-lg font-semibold">{getTitle(pathname, user?.role)}</h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-border"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarImage?.imageUrl} data-ai-hint={avatarImage?.imageHint} />
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-foreground"
                  aria-hidden="true"
                >
                  {user?.displayName}
                </span>
                <ChevronDown
                  className="ml-2 h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-card py-2 shadow-lg ring-1 ring-border focus:outline-none">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-foreground"
                  >
                    Your profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-1 text-sm leading-6 text-foreground"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
