
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import AnimatedHeroBackground from '@/components/animated-hero-background';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import FadeIn from '@/components/ui/fade-in';

export default function Home() {

  const featureSell = PlaceHolderImages.find(p => p.id === 'feature-sell');
  const featureBuy = PlaceHolderImages.find(p => p.id === 'feature-buy');
  const smartGrid = PlaceHolderImages.find(p => p.id === 'smart-grid');
  const solarFarm = PlaceHolderImages.find(p => p.id === 'solar-farm');


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
          {/* How it works 1: Sellers list excess energy */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" rotate>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 1: List Your Energy</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Sellers Monetize Their Surplus
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Homeowners and businesses with solar panels can list their excess energy on our marketplace. Our AI tools help you optimize your pricing based on real-time data to maximize your earnings.
                    </p>
                </div>
                </FadeIn>
                <FadeIn direction="right" delay={200} rotate>
                  <div className="aspect-[3/2] w-full max-w-lg mx-auto">
                      {featureSell && (
                      <Image 
                          src={featureSell.imageUrl}
                          alt={featureSell.description}
                          data-ai-hint={featureSell.imageHint}
                          width={600}
                          height={400}
                          className="rounded-xl shadow-2xl"
                      />
                      )}
                  </div>
                </FadeIn>
             </div>
          </section>

          {/* How it works 2: Buyers subscribe to local sources */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                <FadeIn direction="left" delay={200} rotate>
                  <div className="aspect-[3/2] w-full max-w-lg mx-auto lg:order-first">
                      {featureBuy && (
                      <Image 
                          src={featureBuy.imageUrl}
                          alt={featureBuy.description}
                          data-ai-hint={featureBuy.imageHint}
                          width={600}
                          height={400}
                          className="rounded-xl shadow-2xl"
                      />
                      )}
                  </div>
                </FadeIn>
                <FadeIn direction="right" rotate>
                  <div className="lg:order-last">
                      <h2 className="text-base font-semibold leading-7 text-accent">Step 2: Find & Subscribe</h2>
                      <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                      Buyers Access Clean Power
                      </p>
                      <p className="mt-6 text-lg leading-8 text-muted-foreground">
                      Browse local, renewable energy sources and subscribe to a plan that fits your needs and budget. Enjoy cheaper, cleaner electricity without installing your own panels.
                      </p>
                  </div>
                </FadeIn>
             </div>
          </section>

           {/* How it works 3: Energy flows through the grid */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" rotate>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 3: Secure Transactions</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Transparent & Automated Trading
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Energy is delivered through the existing grid. Our platform securely handles all transactions, ensuring sellers are paid and buyers receive their energy. Every transaction is transparently recorded.
                    </p>
                </div>
               </FadeIn>
               <FadeIn direction="right" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto">
                    {smartGrid && (
                    <Image 
                        src={smartGrid.imageUrl}
                        alt={smartGrid.description}
                        data-ai-hint={smartGrid.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
            </div>
          </section>

           {/* How it works 4: Build a resilient community */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
               <FadeIn direction="left" delay={200} rotate>
                <div className="aspect-[3/2] w-full max-w-lg mx-auto lg:order-first">
                    {solarFarm && (
                    <Image 
                        src={solarFarm.imageUrl}
                        alt={solarFarm.description}
                        data-ai-hint={solarFarm.imageHint}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-2xl"
                    />
                    )}
                </div>
               </FadeIn>
               <FadeIn direction="right" rotate>
                <div className="lg:order-last">
                    <h2 className="text-base font-semibold leading-7 text-accent">Step 4: Power the Community</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Join a Decentralized Network
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    By participating, you're not just a user—you're a stakeholder in a community-owned energy network, building a more sustainable and resilient future together.
                    </p>
                </div>
               </FadeIn>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Social icons can go here */}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} SuryaSetu, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
