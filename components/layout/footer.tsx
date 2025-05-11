import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  categories: [
    { name: "Wellness", href: "/category/wellness" },
    { name: "Nutrition", href: "/category/nutrition" },
    { name: "Fitness", href: "/category/fitness" },
    { name: "Mental Health", href: "/category/mental-health" },
    { name: "Lifestyle", href: "/category/lifestyle" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4 xl:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter">
              Wellness<span className="text-primary">Blog</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Expert health and wellness articles covering nutrition, fitness, mental health, and holistic approaches to well-being.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6">{item.name.charAt(0)}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold">Site</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-semibold">Categories</h3>
                <ul className="mt-4 space-y-3">
                  {navigation.categories.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-base font-semibold">Subscribe</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Get the latest wellness tips and articles delivered to your inbox.
                </p>
                <div className="mt-4 flex max-w-md">
                  <input
                    type="email"
                    className="w-full min-w-0 flex-1 rounded-l-md border border-input bg-background px-4 py-2 text-sm"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-r-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex items-center justify-center">
          <p className="text-sm text-muted-foreground flex items-center">
            &copy; {new Date().getFullYear()} WellnessBlog. Made with 
            <Heart className="h-4 w-4 mx-1 text-red-500" /> 
            for a healthier life.
          </p>
        </div>
      </div>
    </footer>
  );
}