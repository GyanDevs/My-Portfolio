import { ThemeProvider, IntroProvider } from "@/src/components/providers";
import ThemeSwitch from "@/src/components/ThemeSwitch";
import LoadingScreen from "@/src/components/LoadingScreen";

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
  title: "Gyan // Design Engineer",
  description: "Antigravity Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Blocking theme script — runs synchronously before first paint.
          Reads localStorage and applies class="dark" to <html> immediately.
          This is the industry-standard fix for dark-mode FOUC.
          suppressHydrationWarning on <html> prevents React from complaining
          about the class attribute mismatch during hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${mono.variable} ${serif.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeSwitch />
          <IntroProvider>
            <LoadingScreen />
            {children}
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
