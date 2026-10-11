import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Nav";
import NavCategory from "./NavCategory/NavCategory";
import { Suspense } from "react";
import { CategorySkeleton } from "./NavCategory/CategorySkeleton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Know the price!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NavBar />
        <Suspense fallback={<CategorySkeleton />}>
          <NavCategory />
        </Suspense>
        
        {children}
      </body>
    </html>
  );
}
