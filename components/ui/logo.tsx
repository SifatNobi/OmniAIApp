import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  className?: string;
  link?: boolean;
}

export function Logo({ showText = true, className, link = true }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-8 w-8 overflow-hidden rounded-lg">
        <Image
          src="/logo.png"
          alt="OmniAIApp"
          width={32}
          height={32}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="text-lg font-semibold text-white">OmniAIApp</span>
      )}
    </div>
  );

  if (link) {
    return <Link href="/">{content}</Link>;
  }

  return content;
}
