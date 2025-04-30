import type { Metadata } from "next";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import SpotlightBackground from "@/components/SpotlightBackground";

export const metadata: Metadata = {
  title: "Lokesh P - Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and modern web technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SpotlightBackground />
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
