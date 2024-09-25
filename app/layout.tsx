import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

// CEO optimization
export const metadata: Metadata = {
  title: "Trackfolio",
  description: "A Next.js 13 Portfolio Tracking App.",
  icons: {
    icon: '/assets/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
