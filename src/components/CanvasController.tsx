"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SlideHero from "./SlideHero";
import SlideAutomationGrid from "./SlideAutomationGrid";
import SlidePortfolio from "./SlidePortfolio";
import SlideConversion from "./SlideConversion";
import PerspectiveGridCanvas from "./PerspectiveGridCanvas";

gsap.registerPlugin(useGSAP);

export default function CanvasController() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const routeLabels = [
    "sys://core_brand_hero",
    "sys://automation_pipelines",
    "sys://github_project_showcase",
    "sys://secure_gateway",
  ];

  const sectionTitles = [
    "CORE INDEX",
    "PIPELINES",
    "PROJECTS",
    "SECURE PORTAL",
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      if (nextTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return nextTheme;
    });
  };

  const nextSlide = () => {
    if (activeIndex < 3 && !isAnimating.current) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0 && !isAnimating.current) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    if (isAnimating.current || index === activeIndex) return;
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      const threshold = 30;
      if (Math.abs(e.deltaY) > threshold) {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else if (Math.abs(e.deltaX) > threshold) {
        if (e.deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;

      const diffX = e.changedTouches[0].clientX - startX;
      const diffY = e.changedTouches[0].clientY - startY;
      const threshold = 50;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > threshold) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      } else {
        if (Math.abs(diffY) > threshold) {
          if (diffY < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
      element.addEventListener("touchstart", handleTouchStart, { passive: true });
      element.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [activeIndex]);

  // Premium GSAP Cinematic Slide Transition Timeline
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const slides = gsap.utils.toArray<HTMLElement>(".slide-viewport");
      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Shift horizontally
      tl.to(containerRef.current, {
        xPercent: -25 * activeIndex,
        duration: 1.1,
        ease: "power3.inOut",
      }, 0);

      // Shift background slowly for layered parallax depth
      const bg = containerRef.current.parentElement?.querySelector(".parallax-bg-wrapper");
      if (bg) {
        tl.to(bg, {
          x: -35 * activeIndex, // Moves 35px opposite of horizontal slides
          duration: 1.1,
          ease: "power3.inOut",
        }, 0);
      }

      // Fine scale-depth shifts
      slides.forEach((slide, index) => {
        const content = slide.querySelector(".slide-inner-content");
        if (content) {
          if (index === activeIndex) {
            tl.to(content, {
              scale: 1,
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
            }, 0.1);
          } else {
            tl.to(content, {
              scale: 0.96, // subtle zoom out
              opacity: 0.15, // extra dark fade-out for minimalism
              duration: 1.0,
              ease: "power3.out",
            }, 0);
          }
        }
      });
    },
    { dependencies: [activeIndex] }
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      
      {/* 3D Perspective Grid Background (Antigravity Warp Effect) */}
      <PerspectiveGridCanvas />

      {/* Floating Glowing Ambient Particles */}
      <div className="parallax-bg-wrapper fixed inset-0 w-[115vw] h-[115vh] -left-[7vw] -top-[7vh] z-0 pointer-events-none select-none overflow-hidden">
        {/* Spotlight Radial Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_85%)]" style={{ opacity: "var(--glow-opacity)" }} />

        {/* Floating Ambient Glowing Particle Nodes */}
        <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-brand-purple/10 blur-[40px] animate-float-p1" style={{ opacity: "var(--glow-opacity)" }} />
        <div className="absolute top-[60%] left-[80%] w-36 h-36 rounded-full bg-brand-violet/10 blur-[50px] animate-float-p2" style={{ opacity: "var(--glow-opacity)" }} />
        <div className="absolute top-[75%] left-[25%] w-28 h-28 rounded-full bg-brand-magenta/10 blur-[45px] animate-float-p3" style={{ opacity: "var(--glow-opacity)" }} />
        
        {/* Fine dust particles */}
        <div className="absolute top-[40%] left-[50%] w-1.5 h-1.5 rounded-full bg-brand-purple/40 blur-[1px] animate-float-p3" />
        <div className="absolute top-[30%] left-[30%] w-1 h-1 rounded-full bg-brand-violet/30 blur-[1px] animate-float-p2" />
        <div className="absolute top-[80%] left-[65%] w-2 h-2 rounded-full bg-brand-magenta/40 blur-[1px] animate-float-p1" />
      </div>
      
      {/* Floating Header Nav */}
      <header className="fixed top-0 left-0 right-0 h-20 z-[50] flex items-center justify-between px-6 md:px-12 pointer-events-none">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => jumpToSlide(0)}
          data-cursor="pointer"
          className="flex items-center gap-2 pointer-events-auto cursor-pointer select-none"
        >
          <div className="flex items-center gap-1">
            <span className="font-poppins font-bold tracking-widest text-sm" style={{ color: "var(--text-primary)" }}>KUVE</span>
            <span className="text-[10px] text-brand-purple font-sans font-semibold">.CL</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs select-none pointer-events-auto font-sans tracking-wide">
          {["Inicio", "Arquitectura", "Proyectos", "Cotización"].map((label, index) => (
            <button
              key={index}
              onClick={() => jumpToSlide(index)}
              className={`hover:text-[var(--text-primary)] transition-colors duration-300 font-medium cursor-pointer py-1 ${activeIndex === index ? "text-brand-purple border-b-2 border-brand-purple pb-0.5 font-semibold" : "text-[var(--text-secondary)]"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: Theme Toggle & CTA */}
        <div className="flex items-center gap-6 pointer-events-auto select-none font-sans text-xs">
          <button
            onClick={toggleTheme}
            className="cursor-pointer transition-colors duration-300 font-medium py-1 px-3 rounded border text-[10px]"
            style={{
              borderColor: "var(--panel-border)",
              backgroundColor: "var(--panel-bg)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </button>
          
          <button
            onClick={() => jumpToSlide(3)}
            className="px-4 py-2 rounded border hover:bg-[#6366F1] hover:text-white text-[11px] tracking-wide transition-all duration-300 active:scale-97 font-semibold cursor-pointer"
            style={{
              borderColor: "var(--panel-border)",
              backgroundColor: "var(--panel-bg)",
              color: "var(--text-primary)",
            }}
          >
            Cotizar Proyecto
          </button>
        </div>
      </header>

      {/* Slide Container Strip */}
      <div 
        ref={containerRef}
        className="flex flex-row w-[400vw] h-full relative"
      >
        {/* Slide 1 */}
        <div className="slide-viewport w-screen h-full shrink-0 relative bg-transparent">
          <div className="slide-inner-content w-full h-full transform origin-center">
            <SlideHero onInitiateProject={() => jumpToSlide(3)} />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="slide-viewport w-screen h-full shrink-0 relative bg-transparent">
          <div className="slide-inner-content w-full h-full transform origin-center opacity-15 scale-[0.96]">
            <SlideAutomationGrid />
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide-viewport w-screen h-full shrink-0 relative bg-transparent">
          <div className="slide-inner-content w-full h-full transform origin-center opacity-15 scale-[0.96]">
            <SlidePortfolio />
          </div>
        </div>

        {/* Slide 4 */}
        <div className="slide-viewport w-screen h-full shrink-0 relative bg-transparent">
          <div className="slide-inner-content w-full h-full transform origin-center opacity-15 scale-[0.96]">
            <SlideConversion />
          </div>
        </div>
      </div>

      {/* Right Side Vertical Micro Dots */}
      <nav className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-[50] flex flex-col gap-5 items-center">
        {routeLabels.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => jumpToSlide(index)}
              data-cursor="pointer"
              className="group relative flex items-center justify-center p-1.5 cursor-pointer focus:outline-none"
            >
              {/* Tooltip on hover */}
              <span 
                className="absolute right-8 py-0.5 px-2 rounded font-mono text-[8px] tracking-widest uppercase opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap border"
                style={{
                  backgroundColor: "var(--panel-bg)",
                  borderColor: "var(--panel-border)",
                  color: "var(--text-secondary)",
                }}
              >
                {sectionTitles[index]}
              </span>

              {/* Glowing micro-dot */}
              <div 
                className="w-2 h-2 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: isActive ? "rgba(168, 85, 247, 0.8)" : "var(--panel-border)",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              >
                <div 
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? "rgba(168, 85, 247, 0.8)" : "var(--text-muted)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom Left Index */}
      <div className="fixed bottom-8 left-6 md:left-12 z-[50] pointer-events-none flex items-baseline gap-1 select-none font-sans">
        <span className="text-[20px] font-bold tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
          0{activeIndex + 1}
        </span>
        <span className="text-[10px] font-medium opacity-40" style={{ color: "var(--text-secondary)" }}>/ 04</span>
      </div>
    </div>
  );
}
