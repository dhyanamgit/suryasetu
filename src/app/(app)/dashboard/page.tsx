"use client";

import SellerDashboard from '@/components/dashboard/seller-dashboard';
import SuperadminDashboard from '@/components/dashboard/superadmin-dashboard';
import UserDashboard from '@/components/dashboard/user-dashboard';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'buyer':
      return <UserDashboard />;
    case 'seller':
      return <SellerDashboard />;
    case 'superadmin':
      return <SuperadminDashboard />;
    default:
      return <div>Invalid user role.</div>;
  }
}
