import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../hooks/useLanguage";
import { LearnConfigProvider } from "../hooks/useLearnConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileTabBar from "../components/MobileTabBar";
import CommandPalette from "../components/CommandPalette";

import { CONFIG } from "../lib/config";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: '--font-noto-bengali' });

export const metadata: Metadata = {
  title: `${CONFIG.appName} | by ${CONFIG.creatorName}`,
  description: CONFIG.appDescription,
  authors: [{ name: CONFIG.creatorName }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansBengali.variable} antialiased text-gray-900 dark:text-gray-100 min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-900`} suppressHydrationWarning>
        
        {/* Global Beautiful Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent dark:from-blue-800/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent dark:from-purple-800/20"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDIwaDIwVjBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjE1KSIvPgo8L3N2Zz4=')] opacity-50 dark:opacity-[0.15] mask-image:linear-gradient(to_bottom,white,transparent)"></div>
          
          {/* Floating Digits Background */}
          <div className="absolute inset-0 flex justify-around">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-[-10%] font-mono text-4xl sm:text-7xl text-blue-400/50 dark:text-blue-500/40 animate-float-smooth"
                style={{ 
                  left: `${(i * 5) % 100}%`,
                  animationDelay: `${i * 1.2}s`, 
                  animationDuration: `${20 + (i % 10)}s` 
                }}
              >
                {i % 2 === 0 ? '0' : '1'}
              </div>
            ))}
          </div>
        </div>

        <LanguageProvider>
          <LearnConfigProvider>
            <Navbar />
            <div className="flex-grow z-0">
              {children}
            </div>
            <CommandPalette />
            <Footer />
            <MobileTabBar />
          </LearnConfigProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
