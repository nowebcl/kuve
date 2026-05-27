"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // High-response spring
  const springConfig = { damping: 50, stiffness: 600, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setHidden(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[data-cursor='pointer']"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body,
          a,
          button,
          input,
          textarea,
          select,
          [data-cursor="pointer"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Trailing Outer Delicate Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 48 : 20,
          height: hovered ? 48 : 20,
        }}
        animate={{
          scale: hovered ? 1.05 : 1,
          borderColor: hovered ? "rgba(168, 85, 247, 0.7)" : "rgba(255, 255, 255, 0.25)",
          boxShadow: hovered
            ? "0 0 15px rgba(168, 85, 247, 0.15)"
            : "none",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />

      {/* Precise Core Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: 4,
          height: 4,
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
