"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Search, FileCode, ShieldCheck, Terminal, Bot } from "lucide-react";

interface Node {
  id: string;
  title: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  color: string;
  connections: string[];
  details: string[];
  description: string;
}

export default function SlideAutomationGrid() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    {
      id: "researcher",
      title: "Agente de Investigación",
      role: "ANÁLISIS DE REQUERIMIENTOS",
      icon: Search,
      x: 18,
      y: 35,
      color: "#6366F1",
      connections: ["director"],
      details: ["Búsqueda semántica en bases de código", "Escaneo de APIs y librerías"],
      description: "Explora la estructura del proyecto y define los requerimientos lógicos iniciales.",
    },
    {
      id: "writer",
      title: "Agente de Código",
      role: "GENERACIÓN DE SOFTWARE",
      icon: FileCode,
      x: 18,
      y: 65,
      color: "#EC4899",
      connections: ["director", "security"],
      details: ["Refactorización y escritura de componentes", "Resolución automática de sintaxis"],
      description: "Escribe código de forma óptima bajo los lineamientos y patrones de diseño seleccionados.",
    },
    {
      id: "director",
      title: "Agente de Orquestación",
      role: "PLANIFICACIÓN CENTRAL",
      icon: Bot,
      x: 50,
      y: 50,
      color: "#A855F7",
      connections: ["researcher", "writer", "tester", "security"],
      details: ["División de objetivos en subtareas", "Dirección y monitoreo de procesos"],
      description: "Modela la lógica principal, delega tareas específicas y valida el flujo general.",
    },
    {
      id: "tester",
      title: "Agente de Validación",
      role: "PRUEBAS DE ENTORNO",
      icon: Terminal,
      x: 82,
      y: 35,
      color: "#3B82F6",
      connections: ["director"],
      details: ["Ejecución de pruebas automatizadas", "Verificación visual en navegadores"],
      description: "Ejecuta planes de pruebas exhaustivos para asegurar la estabilidad del producto.",
    },
    {
      id: "security",
      title: "Agente de Seguridad",
      role: "COMPATIBILIDAD Y CIFRADO",
      icon: ShieldCheck,
      x: 82,
      y: 65,
      color: "#14B8A6",
      connections: ["director", "writer"],
      details: ["Auditoría de vulnerabilidades estáticas", "Cifrado y protección de credenciales"],
      description: "Inspecciona el código resultante para garantizar que cumpla con los estándares de seguridad.",
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-transparent overflow-hidden">
      
      {/* Subtle faint glow on hover */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 opacity-15"
        style={{
          left: hoveredNode ? `${nodes.find(n => n.id === hoveredNode)?.x}%` : "50%",
          top: hoveredNode ? `${nodes.find(n => n.id === hoveredNode)?.y}%` : "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: hoveredNode 
            ? nodes.find(n => n.id === hoveredNode)?.color 
            : "transparent",
        }}
      />

      {/* Header with Centered/Left-aligned copy deck */}
      <div className="flex flex-col justify-start items-start z-10 w-full pt-10 px-2">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-brand-purple font-semibold">
            01 // ARQUITECTURA DE INTEGRACIÓN
          </span>
          <h2 className="text-xl md:text-2xl font-poppins font-bold tracking-tight mt-1 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Orquestación de Procesos Inteligentes.
          </h2>
          <p className="text-xs font-light max-w-2xl mt-2 font-sans leading-relaxed transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
            Nuestra estructura coordina flujos de desarrollo mediante especializaciones de software que cooperan entre sí. Cada fase es dirigida de manera estable, asegurando solidez en la entrega final.
          </p>
        </div>
      </div>

      {/* Interactive Grid Canvas */}
      <div className="relative flex-1 w-full my-4 min-h-[250px] z-10">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) => 
            node.connections.map((targetId) => {
              const targetNode = nodes.find(n => n.id === targetId);
              if (!targetNode) return null;

              const isFlowing = hoveredNode === node.id || hoveredNode === targetNode.id;

              return (
                <g key={`${node.id}-${targetId}`}>
                  <line
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke="var(--panel-border)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isFlowing ? node.color : "var(--panel-border)"}
                    strokeWidth="1.2"
                    strokeDasharray={isFlowing ? "6 4" : "10 8"}
                    style={{
                      animation: "dash 30s linear infinite",
                      animationDuration: isFlowing ? "3s" : "12s",
                    }}
                  />
                </g>
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isNodeHovered = hoveredNode === node.id;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-gentle-float"
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                animationDelay: `${node.id === "director" ? 0 : node.id === "researcher" ? 1 : 2}s`
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div 
                data-cursor="pointer"
                className="relative group cursor-pointer"
              >
                {/* Micro Border card */}
                <div 
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded border transition-all duration-300 shadow-sm"
                  style={{
                    backgroundColor: "var(--panel-bg)",
                    borderColor: isNodeHovered ? node.color : "var(--panel-border)",
                    boxShadow: isNodeHovered ? `0 0 16px ${node.color}20` : "none",
                  }}
                >
                  <div 
                    className="p-1.5 rounded transition-colors duration-300"
                    style={{
                      backgroundColor: isNodeHovered ? `${node.color}15` : "rgba(168,85,247,0.02)",
                      color: isNodeHovered ? node.color : "var(--text-muted)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[8px] font-sans tracking-wider leading-none font-semibold" style={{ color: "var(--text-muted)" }}>
                      {node.role}
                    </h3>
                    <p className="text-xs font-medium tracking-wide mt-1 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                      {node.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Minimal Diagnostic Bar */}
      <div className="h-14 z-10 w-full border-t flex items-center justify-between px-2 font-sans text-[10px] overflow-hidden" style={{ borderColor: "var(--panel-border)", color: "var(--text-muted)" }}>
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              key={hoveredNode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-1"
            >
              <div className="flex items-center gap-2">
                <span 
                  className="px-2 py-0.5 rounded text-[8px] font-bold font-sans tracking-wide uppercase"
                  style={{
                    backgroundColor: `${nodes.find(n => n.id === hoveredNode)?.color}15`,
                    color: nodes.find(n => n.id === hoveredNode)?.color
                  }}
                >
                  {nodes.find(n => n.id === hoveredNode)?.title}
                </span>
                <span className="font-sans text-[10px] font-normal" style={{ color: "var(--text-secondary)" }}>
                  {nodes.find(n => n.id === hoveredNode)?.description}
                </span>
              </div>

              <div className="flex gap-4">
                {nodes.find(n => n.id === hoveredNode)?.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-gray-400 font-normal text-[9px]" style={{ color: "var(--text-secondary)" }}>
                    <span 
                      className="w-1 h-1 rounded-full" 
                      style={{ backgroundColor: nodes.find(n => n.id === hoveredNode)?.color }}
                    />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between w-full font-sans text-[10px]"
            >
              <div className="flex items-center gap-2 text-brand-purple font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
                SISTEMA OPERATIVO ACTIVO
              </div>
              <div className="font-normal" style={{ color: "var(--text-muted)" }}>
                CONEXIÓN DE RED ESTABLE // ESCALA EMPRESARIAL
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
