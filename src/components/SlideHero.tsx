"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

interface SlideHeroProps {
  onInitiateProject: () => void;
}

export default function SlideHero({ onInitiateProject }: SlideHeroProps) {
  const headingText = "NEXT-GENERATION TECH DEVELOPMENT";
  const words = headingText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 120,
      },
    },
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-transparent overflow-hidden text-center items-center">
      {/* Subtle faint ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-brand-violet/10 via-brand-purple/5 to-transparent rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Top running status bar */}
      <div className="flex items-center justify-center z-10 w-full pt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-violet animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-gray-500 font-light">
            SYS.RUNNING // AI_EXPERIENCE
          </span>
        </motion.div>
      </div>

      {/* Main Centered Content Area */}
      <div className="my-auto max-w-4xl z-10 flex flex-col items-center text-center">
        
        {/* Large Centered Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-transparent mb-6 overflow-hidden select-none pointer-events-none"
        >
          <img 
            src="/logo.png" 
            alt="KUVE Brand Symbol" 
            className="w-full h-full object-contain filter drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))"
          />
        </motion.div>

        {/* Eyebrow Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-violet mb-3 font-light"
        >
          KUVE
        </motion.div>

        {/* Sleek Poppins Bold Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-5xl md:text-[3.5rem] font-poppins font-bold tracking-tight leading-[1.05] text-white select-none"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block mr-3 md:mr-4 overflow-hidden">
              <motion.span
                variants={wordVariants}
                className="inline-block bg-gradient-to-b from-white via-white to-[#BFBFBF] bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Delicate Centered Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-xs md:text-sm text-[#8E8E8E] font-light max-w-xl leading-relaxed font-sans"
        >
          High-level software development and advanced AI automation for enterprise scaling. 
          We engineer dynamic digital architectures that propel global market leaders.
        </motion.p>

        {/* Centered CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <button
            onClick={onInitiateProject}
            data-cursor="pointer"
            className="group relative px-6 py-3 rounded border border-white/10 hover:border-white/30 bg-[#0B0B0B]/85 text-xs font-mono tracking-widest text-white transition-all duration-300 active:scale-98 font-light"
          >
            <span className="flex items-center gap-3">
              [ ENTER SYSTEMS ] 
              <ArrowRight className="w-3 h-3 text-brand-purple transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom status indicators */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-4 z-10 gap-2">
        <div className="flex gap-6 text-[9px] font-mono text-[#4C4C4C] uppercase tracking-widest font-light">
          <div>// LOC: SANTIAGO, CL</div>
          <div>// COMPLIANCE: SOC2</div>
        </div>
        
        <div className="text-[8px] font-mono text-gray-600 tracking-widest uppercase flex items-center gap-1 font-light">
          <Terminal className="w-2.5 h-2.5" />
          SWIPE OR SCROLL TO ENTER
        </div>
      </div>
    </div>
  );
}
