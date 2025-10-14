"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  threshold?: number;
}

const directionClasses: Record<AnimationDirection, { initial: string; final: string }> = {
  up: { initial: "translate-y-16", final: "translate-y-0" },
  down: { initial: "-translate-y-16", final: "translate-y-0" },
  left: { initial: "translate-x-16", final: "translate-x-0" },
  right: { initial: "-translate-x-16", final: "translate-x-0" },
};

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visibility based on whether the element is intersecting
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  const animationConfig = directionClasses[direction];

  return (
    <div
      ref={domRef}
      className={cn(
        "transition-all duration-1000 ease-in-out",
        isVisible 
          ? `opacity-100 scale-100 ${animationConfig.final}`
          : `opacity-0 scale-95 ${animationConfig.initial}`,
        className
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
