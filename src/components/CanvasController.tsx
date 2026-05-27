"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SlideHero from "./SlideHero";
import SlideAutomationGrid from "./SlideAutomationGrid";
import SlidePortfolio from "./SlidePortfolio";
import SlideConversion from "./SlideConversion";

gsap.registerPlugin(useGSAP);

export default function CanvasController() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const routeLabels = [
    "sys://core_brand_hero",
    "sys://automation_pipelines",
    "sys://production_mesh",
    "sys://secure_gateway",
  ];

  const sectionTitles = [
    "CORE INDEX",
    "PIPELINES",
    "SHOWCASE",
    "SECURE PORTAL",
  ];

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
    <div className="relative w-screen h-screen bg-[#0A0A0A] overflow-hidden select-none">
      
      {/* Cinematic Parallax Background Visual */}
      <div 
        className="parallax-bg-wrapper fixed inset-0 w-[115vw] h-[115vh] -left-[7vw] -top-[7vh] z-0 pointer-events-none select-none overflow-hidden animate-gentle-float"
      >
        <video
          src="/home.mp4"
          poster="/ai_experience_bg.png"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 filter brightness-[1.02]"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/45 backdrop-blur-[0.5px]" />
      </div>
      
      {/* Floating Minimalist Header Nav */}
      <header className="fixed top-0 left-0 right-0 h-16 z-[50] flex items-center justify-between px-6 md:px-12 pointer-events-none">
        
        {/* Delicate geometric logo */}
        <div 
          onClick={() => jumpToSlide(0)}
          data-cursor="pointer"
          className="flex items-center gap-3.5 pointer-events-auto cursor-pointer"
        >
          <div className="w-9 h-9 flex items-center justify-center bg-transparent overflow-hidden">
            <img 
              src="/logo.png" 
              alt="KUVE Logo" 
              className="w-full h-full object-contain filter drop-shadow(0 0 6px rgba(168, 85, 247, 0.45))"
            />
          </div>
          <span className="font-montserrat font-light tracking-[0.35em] text-[13px] text-white select-none transition-colors duration-300 hover:text-brand-violet">
            KUVE
          </span>
        </div>

        {/* Minimal Terminal section route */}
        <div className="hidden md:flex items-center gap-2 text-gray-500 font-mono text-[9px] select-none">
          <span className="text-[#3E3E3E] font-medium tracking-widest transition-all duration-300">
            {routeLabels[activeIndex]}
          </span>
        </div>

        {/* Coordinates */}
        <div className="text-[8px] font-mono text-[#4A4A4A] tracking-wider select-none hidden sm:block">
          SYS: ACTIVE [S33.4489°]
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
              <span className="absolute right-8 py-0.5 px-2 rounded bg-black/90 border border-white/5 font-mono text-[8px] text-gray-400 tracking-widest uppercase opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
                {sectionTitles[index]}
              </span>

              {/* Glowing micro-dot */}
              <div 
                className="w-2 h-2 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: isActive ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.1)",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              >
                <div 
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom Left Index visualizer */}
      <div className="fixed bottom-6 left-6 md:left-12 z-[50] pointer-events-none flex items-baseline gap-1.5 font-montserrat select-none">
        <span className="text-[22px] font-thin tracking-wider text-white leading-none">
          0{activeIndex + 1}
        </span>
        <span className="text-[#3A3A3A] font-light text-xs font-mono">/ 04</span>
      </div>
    </div>
  );
}
