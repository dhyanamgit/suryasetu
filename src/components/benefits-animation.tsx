"use client";
import { cn } from "@/lib/utils";
import { DollarSign, Zap, Sun, ShieldCheck } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const benefits = [
  {
    icon: DollarSign,
    title: "Lower Electricity Bills",
    description: "Access locally-produced solar energy at competitive rates, reducing your monthly utility expenses significantly.",
  },
  {
    icon: Sun,
    title: "Earn Passive Income",
    description: "Sell your excess solar power to your community and turn your investment into a consistent source of income.",
  },
  {
    icon: Zap,
    title: "Support Green Energy",
    description: "Contribute to a sustainable future by promoting the use of clean, renewable energy and reducing carbon emissions.",
  },
  {
    icon: ShieldCheck,
    title: "Increase Grid Resilience",
    description: "Help build a decentralized energy network that is more stable and less prone to large-scale outages.",
  },
];

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
  const intervalRef = useRef<NodeJS.Timeout>();

  const roadPath = "M 0 10 L 100 10";
  const totalDuration = 1; // seconds

  useEffect(() => {
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

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      // Start the animation timer
      intervalRef.current = setInterval(() => {
        setActiveBenefit(prev => (prev >= 4 ? 0 : prev + 1));
      }, (totalDuration / 4) * 1000);
    } else {
        setActiveBenefit(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full space-y-16">
      <div className="relative w-full h-[20px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="absolute top-0 left-0"
        >
          <path id="road" d={roadPath} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2.5 1.25" vectorEffect="non-scaling-stroke" />
        </svg>

        {isInView && (
          <div
            className="absolute top-0 left-0 w-[50px] h-[20px] animate-drive"
            style={{
                offsetPath: `path('${roadPath}')`,
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
          return (
            <div key={index} className={cn("text-center transition-all duration-700", isActive ? "opacity-100" : "opacity-30")}>
              <div className="flex justify-center mb-4">
                  <div className={cn("w-16 h-16 rounded-full flex items-center justify-center bg-card border-2 transition-colors duration-500", isActive ? "border-primary text-primary" : "border-border text-muted-foreground")}>
                      <BenefitIcon className="w-8 h-8" />
                  </div>
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BenefitsAnimation;
