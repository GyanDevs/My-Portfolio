"use client";

import { useEffect, useState } from "react";
import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { LENIS_OPTIONS } from "@/src/lib/smoothScroll";
import {
  shouldRootLenisRun,
  subscribeScrollLock,
} from "@/src/lib/scrollLock";

function LenisScrollLockBridge() {
  const lenis = useLenis();
  const [controlVersion, setControlVersion] = useState(0);

  useEffect(
    () => subscribeScrollLock(() => setControlVersion((value) => value + 1)),
    [],
  );

  useEffect(() => {
    if (!lenis) return;
    if (shouldRootLenisRun()) lenis.start();
    else lenis.stop();
  }, [lenis, controlVersion]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisScrollLockBridge />
      {children}
    </ReactLenis>
  );
}
