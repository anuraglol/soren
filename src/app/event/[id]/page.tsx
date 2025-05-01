import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] p-32 mx-auto text-neutral-300">
      <div className="max-w-3xl flex flex-col mx-auto gap-6">
        <div className="w-full relative h-[25rem] mx-auto">
          <Image
            src="https://res.cloudinary.com/dzheectoe/image/upload/v1744732405/ChatGPT_Image_Apr_15_2025_09_04_38_PM_1_tns5jy.jpg"
            alt="Event Image"
            layout="fill"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-medium text-neutral-200">Get yaypiled!</p>
          <p>
            Join us for an exciting event! if we burn, you burn with us! lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <Button>Register Now</Button>
      </div>
    </div>
  );
}
