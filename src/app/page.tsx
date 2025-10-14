import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, DollarSign, Leaf } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import AnimatedHeroBackground from '@/components/animated-hero-background';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
                  SundayGrids is a platform for peer-to-peer energy trading. We connect homeowners who have excess solar power with those who want to buy it.
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

        <div className="py-24 sm:py-32 space-y-24 sm:space-y-32">
          {/* Feature 1: For Sellers */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="text-base font-semibold leading-7 text-accent">For Sellers</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Monetize Your Excess Energy
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Don't let your excess solar power go to waste. List your surplus capacity on our marketplace, set your own price, and start earning. Our AI-powered tools provide insights to help you optimize your listings and maximize your returns based on real-time market and weather data.
                </p>
              </div>
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
            </div>
          </section>

          {/* Feature 2: For Buyers */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div className="lg:order-last">
                <h2 className="text-base font-semibold leading-7 text-accent">For Buyers</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Access Clean, Affordable Power
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Switch to renewable energy without the need for your own solar panels. Browse local producers, subscribe to a plan that fits your needs, and enjoy access to cheaper, cleaner electricity. No installation, no maintenance—just a simple step towards a greener future.
                </p>
              </div>
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
            </div>
          </section>

           {/* Feature 3: Secure & Transparent */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="text-base font-semibold leading-7 text-accent">Secure & Transparent</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  A-Grade Security and Transparency
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                 Every transaction is recorded on a secure ledger, ensuring transparency and trust for all participants in the network. We're committed to building a more equitable and resilient energy system, together.
                </p>
              </div>
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
            </div>
          </section>

           {/* Feature 4: Community-owned */}
          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div className="lg:order-last">
                <h2 className="text-base font-semibold leading-7 text-accent">Community-owned</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Powering the Future, Together
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Join a network that's owned and operated by its users. We believe in a decentralized future where communities control their own energy. By participating in SundayGrids, you're not just a customer—you're a stakeholder in a more equitable and sustainable energy system.
                </p>
              </div>
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
