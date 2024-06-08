import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/header";
import { GradineBg } from "@/components/gradient-bg";
import Astro from "@/components/astro-illus";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "praxis",
  description: "SaaS Mock Interview taker web app",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(GeistMono.variable, "font-mono")}>
          <GradineBg />
          <Header />
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
