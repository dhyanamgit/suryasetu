
"use client";
import { cn } from "@/lib/utils";
import { DollarSign, Zap, Sun, ShieldCheck } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const benefits = [
  {
    icon: DollarSign,
    title: "Lower Electricity Bills",
    description: "Access locally-produced solar energy at competitive rates, reducing your monthly utility expenses significantly.",
    details: "By subscribing to local solar producers on the SuryaSetu platform, you bypass traditional utility markups. Our peer-to-peer model means energy flows more directly from source to consumer, ensuring fair prices for everyone. You can monitor your savings in real-time through your dashboard and see the tangible impact on your wallet."
  },
  {
    icon: Sun,
    title: "Earn Passive Income",
    description: "Sell your excess solar power to your community and turn your investment into a consistent source of income.",
    details: "Your solar panels are an asset. With SuryaSetu, you can monetize every extra kilowatt-hour you generate. Our platform makes it easy to list your excess capacity, and our AI-powered pricing tools help you maximize your earnings based on demand and grid conditions. It’s a simple, automated way to get a return on your solar investment."
  },
  {
    icon: Zap,
    title: "Support Green Energy",
    description: "Contribute to a sustainable future by promoting the use of clean, renewable energy and reducing carbon emissions.",
    details: "Every transaction on SuryaSetu represents a commitment to a greener planet. By participating, you are actively helping to reduce your community's reliance on fossil fuels, decrease air pollution, and combat climate change. Your choice empowers a distributed network of clean energy, creating a more sustainable world for future generations."
  },
  {
    icon: ShieldCheck,
    title: "Increase Grid Resilience",
    description: "Help build a decentralized energy network that is more stable and less prone to large-scale outages.",
    details: "Centralized power grids are vulnerable to single points of failure. A decentralized, community-powered grid, like the one SuryaSetu facilitates, is inherently more resilient. By distributing power generation across many local sources, we reduce the strain on the main grid and create a more robust, reliable energy supply for the entire community."
  },
];

type Benefit = (typeof benefits)[0];


const Car = () => (
  <svg
    width="50"
    height="20"
    viewBox="0 0 50 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="overflow-visible"
  >
    <g transform="translate(0, -4)">
      <path
        d="M5.192 10.744h39.616c0-4.95-3.6-8.96-8-8.96H13.192c-4.4 0-8 4.01-8 8.96z"
        className="fill-card stroke-primary"
        strokeWidth="1.5"
      />
      <path
        d="M10.192 1.784l5 8.96h20l5-8.96"
        className="fill-primary/50 stroke-primary"
        strokeWidth="1.5"
      />
      <circle cx="10.192" cy="14.754" r="3" className="fill-foreground" />
      <circle cx="40.192" cy="14.754" r="3" className="fill-foreground" />
    </g>
  </svg>
);

const BenefitsAnimation = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadContainerRef = useRef<HTMLDivElement>(null);
  const [roadPath, setRoadPath] = useState("path('M0,10 L0,10')");
  const [roadLine, setRoadLine] = useState("M0,10 L0,10");
  const [animationFinished, setAnimationFinished] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const [isClient, setIsClient] = useState(false);

  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const totalDuration = 10; // seconds

  const handleBenefitClick = (benefit: Benefit) => {
    if (animationFinished) {
      setSelectedBenefit(benefit);
      setIsPopupOpen(true);
    }
  };
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    const handleResize = () => {
        if (roadContainerRef.current) {
            const width = roadContainerRef.current.offsetWidth;
            setRoadPath(`path('M0,10 L${width},10')`);
            setRoadLine(`M0,10 L${width},10`);
        }
    }

    window.addEventListener('resize', handleResize);
    // Use a timeout to ensure the layout is stable before measuring
    setTimeout(handleResize, 100);


    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      timeoutRefs.current.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    timeoutRefs.current.forEach(clearTimeout);
    
    if (isInView) {
      setActiveBenefit(1);
      setAnimationFinished(false);
      const benefitInterval = (totalDuration / benefits.length) * 1000;
      
      benefits.forEach((_, index) => {
        if (index > 0) { // The first one is already active
            const timeout = setTimeout(() => {
                setActiveBenefit(index + 1);
            }, benefitInterval * index);
            timeoutRefs.current.push(timeout);
        }
      });
      
      const finishTimeout = setTimeout(() => {
        setAnimationFinished(true);
      }, totalDuration * 1000);
      timeoutRefs.current.push(finishTimeout);


    } else {
        setActiveBenefit(0);
        setAnimationFinished(true);
    }

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [isInView, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full space-y-16">
      <div 
        ref={roadContainerRef} 
        className={cn(
          "relative w-full h-[20px] transition-opacity duration-1000",
          animationFinished ? "opacity-0" : "opacity-100"
        )}
      >
        <svg
          width="100%"
          height="20"
          className="absolute top-0 left-0"
        >
          <path d={roadLine} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2.5 1.25" vectorEffect="non-scaling-stroke" />
        </svg>

        {isInView && (
          <div
            className={cn(
              "absolute top-0 left-0 w-[50px] h-[20px] animate-drive transition-opacity duration-500",
              animationFinished ? "opacity-0" : "opacity-100"
            )}
            style={{
                offsetPath: roadPath,
                animationDuration: `${totalDuration}s`,
            }}
            >
              <Car />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {benefits.map((benefit, index) => {
          const BenefitIcon = benefit.icon;
          const isActive = index < activeBenefit;
          const isClickable = animationFinished;
          
          return (
            <div 
              key={index} 
              className={cn(
                "text-center transition-all duration-700 ease-in-out", 
                isActive ? "opacity-100" : "opacity-30",
                isClickable && "transform hover:scale-105 cursor-pointer"
              )}
              onClick={() => handleBenefitClick(benefit)}
            >
              <div className="flex justify-center mb-4">
                  <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center bg-card border-2 transition-all duration-500", 
                      isActive ? "border-primary text-primary" : "border-border text-muted-foreground",
                      isClickable && "shadow-lg hover:shadow-primary/50"
                    )}>
                      <BenefitIcon className="w-8 h-8" />
                  </div>
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          );
        })}
      </div>
      
      {selectedBenefit && (
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border rounded-xl shadow-2xl">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-background border-2 border-primary text-primary">
                  <selectedBenefit.icon className="w-8 h-8" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-headline">{selectedBenefit.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-lg text-muted-foreground mt-4 px-4">
              {selectedBenefit.details}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BenefitsAnimation;

    