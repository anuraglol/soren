import { AnimatedBeamDemo } from "@/components/flow";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Meteors } from "@/components/magicui/meteors";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen w-full bg-[rgb(0,0,15)] overflow-hidden flex flex-col gap-6 items-center px-72 py-48"
      style={{
        backgroundImage: "url('/assets/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Meteors />
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Project is live on github</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <p className="text-8xl font-[900] text-white text-center max-w-4xl w-full leading-32 font-[family-name:var(--font-inter)]">
        Tung Tung Tung Tung Tung Sahur
      </p>

      <TextAnimate
        animation="blurInUp"
        by="character"
        once
        className="text-2xl text-neutral-200"
      >
        ballerina capucciono, mi mi mi, elemaour anaesthesia, ballerina
      </TextAnimate>

      <ShimmerButton
        shimmerColor="#c084fc" // Light purple shimmer
        shimmerSize="0.08em"
        shimmerDuration="2s"
        className="shadow-2xl my-8"
      >
        <span className="whitespace-pre-wrap text-center text-2xl py-3 px-6 font-medium leading-none tracking-tight text-white dark:text-white lg:text-lg">
          Get Started
        </span>
      </ShimmerButton>

      <AnimatedBeamDemo />
    </div>
  );
}
