"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { LENIS_OPTIONS } from "@/src/lib/smoothScroll";
import { isScrollLocked, subscribeScrollLock } from "@/src/lib/scrollLock";

export function useSplitScrollLayout(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setActive(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return active;
}

type SmoothScrollAreaProps = {
  children: ReactNode;
  className?: string;
  active?: boolean;
  /** Applied once when nested Lenis mounts (e.g. after breakpoint switch). */
  initialScrollTop?: number;
};

export const SmoothScrollArea = forwardRef<HTMLDivElement, SmoothScrollAreaProps>(
  function SmoothScrollArea(
    { children, className, active = false, initialScrollTop = 0 },
    ref,
  ) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const [scrollLocked, setScrollLocked] = useState(() => isScrollLocked());
    const pendingScrollTopRef = useRef(initialScrollTop);

    const setWrapperRef = (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      pendingScrollTopRef.current = initialScrollTop;
    }, [initialScrollTop]);

    useEffect(() => subscribeScrollLock(() => setScrollLocked(isScrollLocked())), []);

    useEffect(() => {
      if (!active) return;

      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;

      const pendingTop = pendingScrollTopRef.current;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (pendingTop > 0) wrapper.scrollTop = pendingTop;
        return;
      }

      const lenis = new Lenis({
        ...LENIS_OPTIONS,
        wrapper,
        content,
      });
      lenisRef.current = lenis;

      if (pendingTop > 0) {
        lenis.scrollTo(pendingTop, { immediate: true });
      }

      if (isScrollLocked()) lenis.stop();

      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    }, [active]);

    useEffect(() => {
      const lenis = lenisRef.current;
      if (!lenis || !active) return;
      if (scrollLocked) lenis.stop();
      else lenis.start();
    }, [scrollLocked, active]);

    if (!active) {
      return (
        <div ref={setWrapperRef} className={className}>
          {children}
        </div>
      );
    }

    return (
      <div ref={setWrapperRef} className={className}>
        <div ref={contentRef}>{children}</div>
      </div>
    );
  },
);
