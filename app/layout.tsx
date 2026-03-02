import { ThemeProvider, IntroProvider } from "@/src/components/providers";
import ThemeSwitch from "@/src/components/ThemeSwitch";
import LoadingScreen from "@/src/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import { JetBrains_Mono, Libre_Bodoni } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Libre_Bodoni({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gyan // Senior Product Designer",
  description: "Portfolio of Gyan, a senior product designer working on complex, research-led systems.",
  metadataBase: new URL("https://gyan.design"),
  openGraph: {
    title: "Gyan // Senior Product Designer",
    description: "Senior product designer crafting research-led, system-heavy products.",
    url: "https://gyan.design",
    siteName: "gyan.design",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "I am Gyan — Senior Product Designer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gyan // Senior Product Designer",
    description: "Senior product designer crafting research-led, system-heavy products.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${mono.variable} ${serif.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="gyan-theme"
        >
          <ThemeSwitch />
          <IntroProvider>
            <LoadingScreen />
            {children}
          </IntroProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
