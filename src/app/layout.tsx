import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SpotlightBackground from '@/components/SpotlightBackground';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lokesh Para | Full Stack Developer",
  description: "Personal portfolio showcasing my skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GitHub Pages SPA routing */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          // This script checks to see if a redirect is present in the query string,
          // converts it back into the correct url and adds it to the browser's history
          // using window.history.replaceState(...), which won't cause the browser to reload.
          (function(l) {
            if (l.search[1] === '/' ) {
              var decoded = l.search.slice(1).split('&').map(function(s) { 
                return s.replace(/~and~/g, '&');
              }).join('?');
              window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location));
        `}} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <SpotlightBackground />
        {children}
      </body>
    </html>
  );
}
