import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-gap bg-off-white">
      <div className="container-konduit text-center">
        <p className="eyebrow">404</p>
        <h1 className="section-headline mt-4">Page not found</h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Return to homepage</Link>
        </Button>
      </div>
    </section>
  );
}
