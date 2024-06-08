"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();

  const routes = [
    {
      index: 1,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      index: 2,
      label: "Upgrade",
      href: "/upgrade",
    },
    {
      index: 1,
      label: "How it works?",
      href: "/docs",
    },
  ];

  return (
    <div className="flex z-50 px-10 py-4 bg-gray-700/20 shadow-sm backdrop-blur-sm items-center justify-between">
      <Link href="/">
        {/* <Image src="/logo.svg" width={40} height={40} alt="logo" /> */}
        <h1
          className={cn(
            GeistMono.variable,
            "font-mono text-4xl font-bold pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#784fe0] to-[#000] bg-clip-text text-center  leading-none tracking-tighter text-transparent select-none"
          )}
        >
          praxis
        </h1>
      </Link>
      <div className="hidden lg:block">
        <ul className="flex items-center justify-between gap-9 text-md text-gray-500 font-bold cursor-pointer">
          {routes.map((route, index) => {
            const active =
              pathname === route.href || pathname.includes(route.href);
            return (
              <Link
                href={route.href}
                className={cn(
                  "transition-all hover:text-black duration-200",
                  active && "text-black"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-6">
        <ClerkLoading>
          <Skeleton className="h-9 w-9 bg-gray-700/40 rounded-full" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Header;
