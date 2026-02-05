import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-8 text-lg text-foreground/80">
        The page you're looking for doesn't exist.
      </p>
      <Button href="/" variant="primary">
        Go Home
      </Button>
    </div>
  );
}

