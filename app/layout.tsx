import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Nav";
import NavCategory from "./NavCategory/NavCategory";
import { Suspense } from "react";
import { CategorySkeleton } from "./NavCategory/CategorySkeleton";
import Marquee from "./Marquee/Marquee";
import { MarqueeSkeleton } from "./Marquee/MarqueeSkeleton";

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
        <Suspense fallback={<MarqueeSkeleton />}>
          <Marquee />
        </Suspense>
        
        {children}

        {/* Footer */}
        <footer className="w-full bg-[#fbfdfa] border-t border-gray-200/80 py-5 mt-auto select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দর সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
