"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Move, Maximize2 } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({
  src,
  alt,
  isOpen,
  onClose,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  // Pinch zoom refs
  const touchStartDist = useRef<number>(0);
  const touchStartScale = useRef<number>(1);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll while open; restore on close or unmount
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mouse pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    },
    [scale]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && scale > 1) {
        setPosition((prev) => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY,
        }));
      }
    },
    [isDragging, scale]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // Pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      touchStartDist.current = dist;
      touchStartScale.current = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = dist / touchStartDist.current;
      const newScale = Math.min(
        Math.max(touchStartScale.current * delta, 1),
        5
      );
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <AnimatePresence onExitComplete={handleReset}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          // backdrop-blur-sm instead of backdrop-blur-xl — same visual, ~8x less GPU cost
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-[110]">
            <div className="flex items-center bg-white/10 border border-white/20 p-1">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white/20 transition-colors text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-white/20 transition-colors text-white px-3 font-mono text-xs"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white/20 transition-colors text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pan hint */}
          {scale > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white/70 text-xs font-mono flex items-center gap-2 pointer-events-none">
              <Move className="w-3 h-3" /> DRAG TO PAN
            </div>
          )}

          {/* Image — uses CSS transform instead of Framer Motion spring for positioning */}
          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-out" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              draggable={false}
              className="max-w-[90vw] max-h-[85vh] object-contain select-none will-change-transform"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                // Simple CSS transition — no spring physics running on every frame
                transition: isDragging ? "none" : "transform 0.2s ease",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
