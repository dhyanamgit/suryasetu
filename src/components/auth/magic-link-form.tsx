
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { Loader2, MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function MagicLinkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { signInWithMagicLink } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithMagicLink(values.email);
      setIsSent(true);
      toast({
        title: "Magic Link Sent!",
        description: `A sign-in link has been sent to ${values.email}.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Failed to send link",
        description: errorMessage,
      });
    } finally {
        setIsLoading(false);
    }
  }

  if (isSent) {
      return (
          <div className="text-center p-4 rounded-md border border-dashed border-accent bg-accent/10">
              <MailCheck className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 text-lg font-medium text-foreground">Check your inbox</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                  We've sent a magic link to your email address. Click the link to sign in.
              </p>
          </div>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : 'Send Magic Link'}
        </Button>
      </form>
    </Form>
  );
}
