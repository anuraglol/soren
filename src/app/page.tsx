import { AnimatedBeamDemo } from "@/components/flow";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Meteors } from "@/components/magicui/meteors";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BACKGROUND_IMAGE_URL, cn } from "@/lib/utils";
import { getUser } from "@civic/auth-web3/nextjs";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BackgroundImagePreloader() {
  return (
    <Image
      src={BACKGROUND_IMAGE_URL}
      alt="Background"
      priority
      fill
      className="object-cover opacity-80"
      quality={80}
    />
  );
}

export default async function LandingPage() {
  const user = await getUser();

  return (
    <div className="relative min-h-screen w-full bg-[rgb(0,0,15)] flex flex-col gap-6 items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 2xl:px-72 py-12 sm:py-24 md:py-36 lg:py-48">
      <div className="absolute w-full min-h-full top-10 hidden sm:block">
        <BackgroundImagePreloader />
      </div>

      <Meteors className="z-[500]" />
      <div
        className={cn(
          "group z-50 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex z-[100] items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Project is live on github</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white text-center max-w-5xl w-full leading-tight z-[100] font-[family-name:var(--font-inter)]">
        Manage your events, create your own.
      </p>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-200 text-center z-[100] max-w-2xl">
        Soren makes it easy to create and manage events, with a focus on
        simplicity and ease of use.
      </p>

      <Link href="/app">
        <ShimmerButton
          shimmerColor="#c084fc"
          shimmerSize="0.08em"
          shimmerDuration="2s"
          className="shadow-2xl cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md z-[100]"
        >
          <span className="whitespace-pre-wrap text-center text-base sm:text-lg md:text-xl py-2 sm:py-3 px-4 sm:px-6 font-medium leading-none tracking-tight text-white dark:text-white">
            {user ? "Go to App" : "Get Started"}
          </span>
        </ShimmerButton>
      </Link>

      <AnimatedBeamDemo />
    </div>
  );
}
