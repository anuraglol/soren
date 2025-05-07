"use client";

import React, { forwardRef, useRef } from "react";
import { User, Plus, Settings } from "lucide-react"; // <- Import lucide-react icons
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./magicui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null); // <- New ref

  return (
    <div
      className="relative flex w-full max-w-[600px] items-center justify-center overflow-hidden p-10 z-[100]"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10 text-neutral-900">
        <div className="flex flex-row justify-between w-full">
          <Circle ref={div1Ref}>
            <User className="h-5 w-5" />
          </Circle>
          <Circle ref={div2Ref}>
            <Plus className="h-5 w-5" />
          </Circle>
          <Circle ref={div3Ref}>
            <Settings className="h-5 w-5" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
      />
    </div>
  );
}
