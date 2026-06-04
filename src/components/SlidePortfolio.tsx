"use client";

import { useState } from "react";
import { FolderGit2, Shield } from "lucide-react";

interface Project {
  id: number;
  repoName: string;
  description: string;
  languages: { name: string; percent: number; color: string }[];
  status: "En Proceso" | "Pronto";
  color: string;
  systemSpec: string;
}

function ParallaxCard({ item }: { item: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "var(--panel-bg)",
        borderColor: hovered ? "rgba(168, 85, 247, 0.25)" : "var(--panel-border)",
      }}
      className="relative flex-1 h-[320px] rounded border bg-transparent overflow-hidden cursor-pointer select-none transition-colors duration-300 w-full max-w-sm flex flex-col justify-between p-6"
    >
      {/* Background highlight glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${item.color}15 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.2,
        }}
      />

      <div className="flex-1 flex flex-col justify-between">
        
        {/* Top Header info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-sans tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>
              Tecnología Activa
            </span>
          </div>
          
          {/* Status Badge */}
          {item.status === "En Proceso" ? (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-blue-500/20 bg-blue-500/5 text-[8px] font-sans font-semibold tracking-wide text-blue-500 dark:text-blue-400 uppercase">
              <span className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
              {item.status}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-amber-500/20 bg-amber-500/5 text-[8px] font-sans font-semibold tracking-wide text-amber-500 dark:text-amber-400 uppercase">
              <span className="w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              {item.status}
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="my-auto space-y-2 pt-4">
          <h3 className="text-sm font-bold tracking-wide font-sans transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            {item.repoName}
          </h3>
          <p className="text-[11px] font-sans leading-relaxed font-light transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
            {item.description}
          </p>
        </div>

        {/* Dynamic Language breakdown bar */}
        <div className="space-y-1.5 pt-4">
          <div className="flex h-1.5 rounded-full overflow-hidden w-full bg-black/10 dark:bg-white/5">
            {item.languages.map((lang, idx) => (
              <div
                key={idx}
                style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                className="h-full"
                title={`${lang.name}: ${lang.percent}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8.5px] font-sans font-medium" style={{ color: "var(--text-secondary)" }}>
            {item.languages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <span>{lang.name} {lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SlidePortfolio() {
  const projects: Project[] = [
    {
      id: 1,
      repoName: "Vortex Fintech Core",
      description: "Estructura transaccional distribuida de alta frecuencia. Diseñada para procesamiento financiero multihilo rápido y estable.",
      languages: [
        { name: "Go", percent: 68, color: "#00ADD8" },
        { name: "TypeScript", percent: 22, color: "#3178C6" },
        { name: "Rust", percent: 10, color: "#DEA584" }
      ],
      status: "En Proceso",
      color: "#6366F1",
      systemSpec: "VTX.NODE.V4",
    },
    {
      id: 2,
      repoName: "Atlas Logistics Mesh",
      description: "Modelo de optimización y enrutamiento logístico. Planifica despachos eficientes basados en heurística de red local.",
      languages: [
        { name: "Python", percent: 75, color: "#3572A5" },
        { name: "C++", percent: 20, color: "#F34B7D" },
        { name: "Shell", percent: 5, color: "#89E051" }
      ],
      status: "Pronto",
      color: "#A855F7",
      systemSpec: "ATL.MESH.AI",
    },
    {
      id: 3,
      repoName: "Titan Cloud Security",
      description: "Auditoría de ciberseguridad continua e integración automatizada. Monitorea compliance y analiza debilidades críticas.",
      languages: [
        { name: "TypeScript", percent: 90, color: "#3178C6" },
        { name: "Shell", percent: 10, color: "#89E051" }
      ],
      status: "En Proceso",
      color: "#EC4899",
      systemSpec: "TTN.SHIELD.V2",
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-transparent overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col justify-start items-start z-10 w-full pt-10 px-2">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-brand-magenta font-semibold">
            02 // CASOS DE DESARROLLO
          </span>
          <h2 className="text-xl md:text-2xl font-poppins font-bold tracking-tight mt-1 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Proyectos en Ejecución.
          </h2>
          <p className="text-xs font-light max-w-2xl mt-2 font-sans leading-relaxed transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
            Revisa el estado de nuestras soluciones activas. Mantenemos una traza transparente sobre el avance y empaquetamiento de cada módulo.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 items-center justify-center my-4 z-10 w-full perspective-[1000px] px-2">
        {projects.map((item) => (
          <ParallaxCard key={item.id} item={item} />
        ))}
      </div>

      {/* Footer / Performance Metrics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4 z-10 w-full gap-2 font-sans text-[10px]" style={{ borderColor: "var(--panel-border)", color: "var(--text-muted)" }}>
        <div className="flex gap-4 sm:gap-6 uppercase">
          <div>Integridad de Código</div>
          <div className="text-brand-magenta font-semibold">Integración y Despliegue Estable</div>
        </div>
        <div className="mt-1 sm:mt-0 text-[9px] uppercase tracking-wider flex items-center gap-1.5 font-normal" style={{ color: "var(--text-muted)" }}>
          <Shield className="w-3.5 h-3.5 text-brand-magenta" />
          Verificación de Plataforma Completada
        </div>
      </div>

    </div>
  );
}
