
"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import AnimatedHeroBackground from '@/components/animated-hero-background';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import FadeIn from '@/components/ui/fade-in';
import BenefitsAnimation from '@/components/benefits-animation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const step1 = PlaceHolderImages.find(p => p.id === 'how-it-works-1');
  const step2 = PlaceHolderImages.find(p => p.id === 'how-it-works-2');
  const step3 = PlaceHolderImages.find(p => p.id === 'how-it-works-3');
  const step4 = PlaceHolderImages.find(p => p.id === 'how-it-works-4');
  const step5 = PlaceHolderImages.find(p => p.id === 'how-it-works-5');
  const step6 = PlaceHolderImages.find(p => p.id === 'how-it-works-6');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Logo />
          </div>
          <div className="flex lg:flex-1 lg:justify-end gap-x-4">
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        <div className="relative isolate pt-14 h-[70vh] flex items-center justify-center">
           <AnimatedHeroBackground />
          
          <div className="py-24 sm:py-32 z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl font-headline">
                  The future of the grid is decentralized
                </h1>
                <p className="mt-6 text-lg leading-8 text-neutral-300">
                  SuryaSetu is a platform for peer-to-peer energy trading. We connect homeowners who have excess solar power with those who want to buy it.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started <ArrowRight /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeIn>
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-accent">How It Works</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  A simple, transparent process
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Our platform connects solar energy producers and consumers through a secure and decentralized marketplace.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="py-24 sm:py-32 space-y-24 sm:space-y-32 overflow-x-hidden">
          {/* How it works 1: Sign up */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" rotate>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 1: Sign Up & Connect</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Join the Network
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Create your account as an energy buyer or seller. Sellers can easily connect their existing solar panel systems to the platform with our guided setup process.
                    </p>
                </div>
                </FadeIn>
                <FadeIn direction="right" delay={200} rotate>
                  <div className="aspect-[3/2] w-full max-w-lg mx-auto">
                      {step1 && (
                      <Image 
                          src={step1.imageUrl}
                          alt={step1.description}
                          data-ai-hint={step1.imageHint}
                          width={600}
                          height={400}
                          className="rounded-xl shadow-2xl"
                      />
                      )}
                  </div>
                </FadeIn>
             </div>
          </section>

          {/* How it works 2: List Energy */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                <FadeIn direction="left" delay={200} rotate>
                  <div className="aspect-[3/2] w-full max-w-lg mx-auto lg:order-last">
                      {step2 && (
                      <Image 
                          src={step2.imageUrl}
                          alt={step2.description}
                          data-ai-hint={step2.imageHint}
                          width={600}
                          height={400}
                          className="rounded-xl shadow-2xl"
                      />
                      )}
                  </div>
                </FadeIn>
                <FadeIn direction="right" rotate>
                  <div className="lg:order-first">
                      <h2 className="text-base font-semibold leading-7 text-accent">Step 2: List Excess Energy</h2>
                      <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                      Monetize Your Surplus
                      </p>
                      <p className="mt-6 text-lg leading-8 text-muted-foreground">
                      Sellers can list their excess energy on our marketplace. Our AI tools help you optimize your pricing based on real-time data to maximize your earnings.
                      </p>
                  </div>
                </FadeIn>
             </div>
          </section>

           {/* How it works 3: Discover */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" rotate>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 3: Discover Local Sources</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Find Clean Energy Nearby
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Buyers can browse a map of local, renewable energy producers. Filter by price, distance, and energy source to find the perfect match for your needs.
                    </p>
                </div>
               </FadeIn>
               <FadeIn direction="right" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto">
                    {step3 && (
                    <Image 
                        src={step3.imageUrl}
                        alt={step3.description}
                        data-ai-hint={step3.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
            </div>
          </section>

           {/* How it works 4: Subscribe */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto lg:order-last">
                    {step4 && (
                    <Image 
                        src={step4.imageUrl}
                        alt={step4.description}
                        data-ai-hint={step4.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
               <FadeIn direction="right" rotate>
                <div className="lg:order-first">
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 4: Subscribe & Save</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Access Cheaper Power
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Choose a producer and subscribe to a plan that fits your budget. Enjoy cheaper, cleaner electricity without needing to install your own panels.
                    </p>
                </div>
               </FadeIn>
            </div>
          </section>

          {/* How it works 5: Automated Trading */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" rotate>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 5: Automated Trading</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Secure & Transparent
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Energy is delivered via the existing grid. Our platform uses smart contracts to securely automate transactions, ensuring sellers are paid and buyers get their energy.
                    </p>
                </div>
               </FadeIn>
               <FadeIn direction="right" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto">
                    {step5 && (
                    <Image 
                        src={step5.imageUrl}
                        alt={step5.description}
                        data-ai-hint={step5.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
            </div>
          </section>

          {/* How it works 6: Build a Resilient Grid */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto lg:order-last">
                    {step6 && (
                    <Image 
                        src={step6.imageUrl}
                        alt={step6.description}
                        data-ai-hint={step6.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
               <FadeIn direction="right" rotate>
                <div className="lg:order-first">
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 6: Build a Resilient Grid</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Power Your Community
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    By participating, you're not just a user—you're a stakeholder in a community-owned energy network, building a more sustainable and resilient future together.
                    </p>
                </div>
               </FadeIn>
            </div>
          </section>

        </div>

        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <FadeIn>
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-accent">Our Benefits</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                        Drive Towards a Greener Future
                        </p>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Discover the advantages of joining a community-powered energy grid. It's more than just electricity; it's a movement.
                        </p>
                    </div>
                </FadeIn>
                <div className="mt-16">
                    <BenefitsAnimation />
                </div>
            </div>
        </div>

      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Social icons can go here */}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; {year} SuryaSetu, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
