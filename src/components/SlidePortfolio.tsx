"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Globe } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  tagline: string;
  metrics: string;
  metricLabel: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  systemSpec: string;
}

function ParallaxCard({ item }: { item: CaseStudy }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Very subtle tilt angle (max 6deg) for elegance
  const springConfig = { damping: 30, stiffness: 250, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const textTranslateX = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);
  const textTranslateY = useSpring(useTransform(y, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex-1 h-[360px] rounded border border-white/5 bg-[#0C0C0C]/80 backdrop-blur-md overflow-hidden cursor-pointer select-none transition-colors duration-300 hover:border-white/15"
      data-cursor="pointer"
    >
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${item.color}08 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-between" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        
        {/* Top items */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded text-white" style={{ backgroundColor: `${item.color}15` }}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-gray-500">
              {item.category}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-600 transition-colors duration-300 group-hover:text-white" />
        </div>

        {/* Content */}
        <motion.div 
          style={{ x: textTranslateX, y: textTranslateY }}
          className="my-auto space-y-2"
        >
          <h3 className="text-lg font-montserrat font-light text-white tracking-wide">
            {item.title}
          </h3>
          <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
            {item.tagline}
          </p>
        </motion.div>

        {/* Bottom Metrics */}
        <div className="border-t border-white/5 pt-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-montserrat font-thin text-white">
              {item.metrics}
            </div>
            <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest mt-0.5">
              {item.metricLabel}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[8px] font-mono text-gray-600 tracking-wider">
              PATH
            </div>
            <div className="text-[9px] font-mono text-white tracking-widest mt-0.5">
              {item.systemSpec}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function SlidePortfolio() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "VORTEX FINTECH CORE",
      category: "Transaction Sync",
      tagline: "Autonomous multi-ledger financial pipeline scaling sub-second asset transfers.",
      metrics: "$14B+",
      metricLabel: "Processed Annually",
      color: "#6366F1",
      icon: Zap,
      systemSpec: "SECURE.V3",
    },
    {
      id: 2,
      title: "ATLAS LOGISTICS MESH",
      category: "Supply Chain AI",
      tagline: "Full-network optimization model determining container routes to reduce fuel burn.",
      metrics: "-42%",
      metricLabel: "Operational Friction",
      color: "#A855F7",
      icon: Globe,
      systemSpec: "ATLAS.AI",
    },
    {
      id: 3,
      title: "TITAN CLOUD AGENTS",
      category: "Cloud Defense",
      tagline: "Distributed threat-prevention nodes analyzing system signatures continuously.",
      metrics: "0ms",
      metricLabel: "Reaction Lag",
      color: "#EC4899",
      icon: ShieldCheck,
      systemSpec: "SHIELD.CORE",
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-[#0A0A0A] bg-grid-dots overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 w-full pt-10">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-brand-magenta">
            PRODUCTION LOG
          </span>
          <h2 className="text-xl md:text-2xl font-montserrat font-light tracking-tight mt-1 text-white">
            CASE STUDIES & PRODUCTS
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 text-[8px] text-gray-600 font-mono">
          Interactive catalog. Tilt physical modules to query metrics.
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 items-center justify-center my-4 z-10 w-full perspective-[1000px]">
        {caseStudies.map((item) => (
          <ParallaxCard key={item.id} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/5 pt-4 z-10 w-full">
        <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
          // CLIENT METRICS COMPLETED BY KUVE S.A.
        </div>
        <div className="mt-1 sm:mt-0 text-[8px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-brand-magenta" />
          SYSTEM METRICS SYNCED
        </div>
      </div>

    </div>
  );
}
