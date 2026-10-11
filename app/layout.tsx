import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Nav";
import NavCategory from "./NavCategory/NavCategory";
import { Suspense } from "react";
import { CategorySkeleton } from "./NavCategory/CategorySkeleton";
import Marquee from "./Marquee/Marquee";
import { MarqueeSkeleton } from "./Marquee/MarqueeSkeleton";

import Footer from "./components/footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Know the price!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${notoSerifBengali.variable} ${notoSerifBengali.className} h-full antialiased`}
    >
      <body className={`${notoSerifBengali.className} min-h-full flex flex-col bg-white text-gray-900`}>
        <NavBar />
        <Suspense fallback={<CategorySkeleton />}>
          <NavCategory />
        </Suspense>
        <Suspense fallback={<MarqueeSkeleton />}>
          <Marquee />
        </Suspense>
        
        {children}

        <Footer />
      </body>
    </html>
  );
}
