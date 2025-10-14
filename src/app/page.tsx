import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Zap, DollarSign, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'smart-grid');

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
        <div className="relative isolate pt-14">
           <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a7f3d0] to-[#34d399] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-7xl font-headline">
                  The future of the grid is decentralized
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  SundayGrids is a platform for peer-to-peer energy trading. We connect homeowners who have excess solar power with those who want to buy it.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started <ArrowRight /></Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <div className="mt-16 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        width={2432}
                        height={1442}
                        className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-accent">How It Works</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                A marketplace for your neighborhood
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Whether you're looking to monetize your solar panels or access renewable energy, our platform makes it simple and rewarding.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <DollarSign className="h-6 w-6 text-primary-foreground" />
                    </div>
                    For Sellers
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    List your excess solar capacity, set your price, and get paid. Our AI tools help you optimize your offerings based on real-time data.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <Zap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    For Buyers
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Access affordable, clean energy from local producers. No installation, no maintenance. Just a simple subscription to a greener future.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <Leaf className="h-6 w-6 text-primary-foreground" />
                    </div>
                    Secure and transparent
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Every transaction is recorded on a secure ledger, ensuring transparency and trust for all participants in the network.
                  </dd>
                </div>
                 <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-foreground"><path d="m12 14 4-4"/><path d="M12 14v6"/><path d="M14 12.5a2.5 2.5 0 0 0-5 0v.5a2.5 2.5 0 0 0 5 0V12Z"/><path d="M12 4a2.5 2.5 0 0 0-2.5 2.5V8a2.5 2.5 0 0 0 5 0V6.5A2.5 2.5 0 0 0 12 4Z"/><path d="M7 14a2.5 2.5 0 0 0-5 0v.5a2.5 2.5 0 0 0 5 0V14Z"/><path d="M12 20a2.5 2.5 0 0 0-2.5 2.5V24a2.5 2.5 0 0 0 5 0v-1.5A2.5 2.5 0 0 0 12 20Z"/><path d="M17 14a2.5 2.5 0 0 0 5 0v.5a2.5 2.5 0 0 0-5 0V14Z"/><path d="M12 8V2"/><path d="M7.5 6.5a2.5 2.5 0 0 0-5 0V8a2.5 2.5 0 0 0 5 0V6.5Z"/><path d="M17.5 6.5a2.5 2.5 0 0 0 5 0V8a2.5 2.5 0 0 0-5 0V6.5Z"/></svg>
                    </div>
                    Community-owned
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    Join a network that's owned by its users. We're building a more equitable and resilient energy system, together.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
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
