"use client";

import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Users, Shield, Activity, CircleDot } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const users = [
  { id: 'usr_1', name: 'Test Buyer', email: 'buyer@test.com', role: 'buyer', status: 'Active', joined: '2023-10-01' },
  { id: 'usr_2', name: 'Test Seller', email: 'seller@test.com', role: 'seller', status: 'Active', joined: '2023-09-15' },
  { id: 'usr_3', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'buyer', status: 'Active', joined: '2023-10-05' },
  { id: 'usr_4', name: 'Energy Corp', email: 'contact@energycorp.com', role: 'seller', status: 'Pending', joined: '2023-10-20' },
  { id: 'usr_5', name: 'Mike Johnson', email: 'mike.j@example.com', role: 'buyer', status: 'Banned', joined: '2023-08-11' },
];

export default function SuperadminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Superadmin Panel</h1>
      <p className="text-muted-foreground">Welcome, {user?.displayName}. Here's the platform overview.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,421</div>
            <p className="text-xs text-muted-foreground">+50 in the last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400 flex items-center gap-2">
              <CircleDot className="h-6 w-6" /> Operational
            </div>
            <p className="text-xs text-muted-foreground">All systems are running smoothly.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">231</div>
            <p className="text-xs text-muted-foreground">Total volume: $2,489.10</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View, manage, and moderate platform users.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-sm text-muted-foreground">{u.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'seller' ? 'default' : 'secondary'} className="capitalize">{u.role}</Badge>
                  </TableCell>
                  <TableCell>
                     <Badge 
                       variant={u.status === 'Active' ? 'outline' : 'destructive'} 
                       className={u.status === 'Active' ? 'border-green-500 text-green-500' : ''}
                      >
                       {u.status}
                     </Badge>
                  </TableCell>
                  <TableCell>{u.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Suspend</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
