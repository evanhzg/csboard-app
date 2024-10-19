import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "./Providers";
import { Suspense } from "react";
import Menu from "@/components/Menu";

export const metadata: Metadata = {
  title: "Evan's Playground",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="lg:flex">
        <Suspense>
          <Providers>
            <Menu />
            <div
              className="flex 
      bg-gradient-to-br from-emerald-400 to-emerald-800 w-screen h-[calc(100vh-4rem)] lg:h-screen overflow-auto"
            >
              {children}
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
