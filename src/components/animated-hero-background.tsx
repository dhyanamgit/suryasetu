"use client";

import { Leaf, Sun, Zap, Home } from "lucide-react";
import React from "react";

const icons = [
  { icon: <Sun className="size-16 text-primary" />, position: { top: '10%', left: '20%' }, duration: '3s' },
  { icon: <Zap className="size-12 text-accent" />, position: { top: '25%', left: '70%' }, duration: '2.5s' },
  { icon: <Leaf className="size-14 text-green-500" />, position: { top: '70%', left: '10%' }, duration: '4s' },
  { icon: <Home className="size-16 text-primary" />, position: { top: '80%', left: '80%' }, duration: '3.5s' },
  { icon: <Sun className="size-20 text-accent" />, position: { top: '40%', left: '40%' }, duration: '2s' },
  { icon: <Zap className="size-10 text-green-500" />, position: { top: '5%', left: '90%' }, duration: '4.5s' },
  { icon: <Leaf className="size-12 text-primary" />, position: { top: '60%', left: '50%' }, duration: '3s' },
  { icon: <Home className="size-14 text-accent" />, position: { top: '30%', left: '5%' }, duration: '2.8s' },
  { icon: <Sun className="size-16 text-green-500" />, position: { top: '85%', left: '30%' }, duration: '3.2s' },
  { icon: <Zap className="size-12 text-primary" />, position: { top: '50%', left: '90%' }, duration: '2.2s' },
];

const AnimatedHeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute inset-0 bg-black/70" />
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute animate-flash"
          style={{
            ...item.position,
            animationDuration: item.duration,
            animationDelay: `${index * 0.3}s`,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default AnimatedHeroBackground;
