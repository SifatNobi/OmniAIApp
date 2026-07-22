import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10">
          <Sparkles className="h-10 w-10 text-accent" />
        </div>
        <h1 className="mb-2 text-5xl font-bold text-white">404</h1>
        <p className="mb-8 text-lg text-text-secondary">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
