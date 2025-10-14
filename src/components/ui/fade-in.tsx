"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
}

const directionClasses: Record<AnimationDirection, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
};

const FadeIn: React.FC<FadeInProps> = ({ children, className, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // No need to unobserve, we want it to stay visible
          }
        });
      },
      { threshold: 0.1 }
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
  }, []);

  const startingPositionClass = directionClasses[direction];

  return (
    <div
      ref={domRef}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${startingPositionClass}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
