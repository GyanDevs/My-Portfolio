"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

interface IntroContextType {
  hasPlayed: boolean;
  setHasPlayed: (value: boolean) => void;
  introComplete: boolean;
  setIntroComplete: (value: boolean) => void;
}
const IntroContext = React.createContext<IntroContextType | undefined>(
  undefined,
);
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <IntroContext.Provider
      value={{ hasPlayed, setHasPlayed, introComplete, setIntroComplete }}
    >
      {" "}
      {children}{" "}
    </IntroContext.Provider>
  );
}
export function useIntro() {
  const context = React.useContext(IntroContext);
  if (context === undefined) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
