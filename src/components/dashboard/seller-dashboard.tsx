"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { DollarSign, Sun, Users, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { getRecommendation } from '@/app/actions';
import type { RecommendExcessCapacityOutput } from '@/ai/flows/recommend-excess-capacity';

const recommendationSchema = z.object({
  location: z.string().min(2, 'Location is required.'),
  weatherData: z.string().min(10, 'Weather data description is required.'),
  solarProductionData: z.string().min(10, 'Solar production data is required.'),
});

const recentActivity = [
    { type: 'Subscription', user: 'Alice', amount: 5.2, date: '2h ago' },
    { type: 'Payment', user: 'System', amount: 45.75, date: '1d ago' },
    { type: 'Subscription', user: 'Bob', amount: 3.8, date: '2d ago' },
];

export default function SellerDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendExcessCapacityOutput | null>(null);

  const form = useForm<z.infer<typeof recommendationSchema>>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      location: '',
      weatherData: '',
      solarProductionData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getRecommendation(values);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Welcome, {user?.displayName}!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Production</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 kWh</div>
            <p className="text-xs text-muted-foreground">Excess capacity available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI-Powered Excess Capacity Recommendation
            </CardTitle>
            <CardDescription>
              Let our AI analyze your data to recommend the optimal excess solar capacity to list for sale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather Data</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe historical and current weather: 'Average 250 sunny days/year, mild winters, frequent summer fog...'"
                          {...field}
                        />
                      </FormControl>
                       <FormDescription>
                        Include sunshine hours, cloud cover, temperature, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="solarProductionData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solar Production Data</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your solar setup: '5kW system, 20 panels at 85% efficiency, south-facing roof...'"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include panel capacity, efficiency, orientation, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Recommendation'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          {recommendation && (
            <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                 <h3 className="font-semibold text-lg">AI Recommendation Result:</h3>
                 <div className="text-4xl font-bold text-accent">{recommendation.recommendedExcessCapacity} kWh</div>
                 <div>
                    <h4 className="font-semibold">Justification:</h4>
                    <p className="text-muted-foreground mt-1">{recommendation.justification}</p>
                 </div>
            </CardFooter>
          )}
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-full">
                                {activity.type === 'Subscription' ? <Users className="h-5 w-5 text-muted-foreground" /> : <DollarSign className="h-5 w-5 text-muted-foreground" />}
                            </div>
                            <div className="flex-grow">
                                <p className="font-medium">{activity.user} {activity.type === 'Subscription' ? 'subscribed' : 'paid'}</p>
                                <p className="text-sm text-muted-foreground">{activity.type === 'Subscription' ? `${activity.amount} kWh` : `$${activity.amount}`}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
