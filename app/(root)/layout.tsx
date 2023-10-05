import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { StoreProvider } from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

// CEO optimization
export const metadata: Metadata = {
  title: "Trackfolio",
  description: "A Next.js 13 Portfolio Tracking App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>

      <html lang="en">
        <body className={inter.className}>

          <Topbar />
          <main className="flex flex-row bg-dark-1">

            <LeftSidebar />
            <section className='container main-container'>
              <div className="w-full">
                {children}
              </div>
            </section>

            <RightSidebar />

          </main>

          <Bottombar />

        </body>
      </html>
    </StoreProvider>
  )
}
