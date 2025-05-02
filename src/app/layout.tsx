import type { Metadata } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import SpotlightBackground from "@/components/SpotlightBackground";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Lokesh P - Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and modern web technologies",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpotlightBackground />
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
