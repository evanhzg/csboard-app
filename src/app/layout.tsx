import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "./Providers";
import { Suspense } from "react";
import PageLayout from "@/components/PageLayout";

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
      <body className={`lg:flex `}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <PageLayout>{children}</PageLayout>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
