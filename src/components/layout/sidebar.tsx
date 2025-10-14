"use client";

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Home, Zap, DollarSign, Shield, BarChart2, Users } from 'lucide-react';
import Logo from '@/components/logo';
import { useAuth, UserRole } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const buyerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Find Energy', href: '/dashboard/find', icon: Zap },
  { name: 'My Subscriptions', href: '/dashboard/subscriptions', icon: DollarSign },
];

const sellerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Listings', href: '/dashboard/listings', icon: BarChart2 },
  { name: 'Earnings', href: '/dashboard/earnings', icon: DollarSign },
];

const superAdminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'User Management', href: '/dashboard/users', icon: Users },
  { name: 'Platform Stats', href: '/dashboard/stats', icon: Shield },
];

const navigationMap: Record<UserRole, typeof buyerNavigation> = {
  buyer: buyerNavigation,
  seller: sellerNavigation,
  superadmin: superAdminNavigation,
};

function NavigationItems() {
    const { user } = useAuth();
    const pathname = usePathname();
    const navigation = user ? navigationMap[user.role] : [];
  
    return navigation.map((item) => (
      <li key={item.name}>
        <Link
          href={item.href}
          className={cn(
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
          )}
        >
          <item.icon
            className={cn(
                pathname === item.href
                ? 'text-primary-foreground'
                : 'text-muted-foreground group-hover:text-foreground',
              'h-6 w-6 shrink-0'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      </li>
    ));
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Logo />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                           <NavigationItems />
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                    <NavigationItems />
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
