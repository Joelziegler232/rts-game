
import type { Metadata } from "next";
import { Inter } from "next/font/google";
 import "./globals.css";
import 'tailwindcss';
import Providers from "./Providers";
import Navbar from "@/app/components/Navbar";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "TP Progra 3 Final",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          {/* <Navbar /> */}
        {children}
        </Providers>
        </body>
    </html>
  );
}