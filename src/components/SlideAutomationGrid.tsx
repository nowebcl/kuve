"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Radio, GitMerge, BarChart3, Network } from "lucide-react";

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
}

export default function SlideAutomationGrid() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    {
      id: "ingest",
      title: "Real-time Ingest",
      role: "IOT GATEWAY",
      icon: Radio,
      x: 18,
      y: 35,
      color: "#6366F1",
      connections: ["core"],
      details: ["HTTP/Websocket channels", "Sub-5ms global latency"],
    },
    {
      id: "api",
      title: "Secure API Mesh",
      role: "PROTOCOLS",
      icon: GitMerge,
      x: 18,
      y: 65,
      color: "#EC4899",
      connections: ["core", "analytics"],
      details: ["gRPC & GraphQL", "Firewall token filters"],
    },
    {
      id: "core",
      title: "Cognitive AI Core",
      role: "AGENTS",
      icon: Cpu,
      x: 50,
      y: 50,
      color: "#A855F7",
      connections: ["ingest", "api", "db", "analytics"],
      details: ["Auto-routing LLM mesh", "Heuristic self-healing"],
    },
    {
      id: "db",
      title: "Enterprise Sync",
      role: "SAP MIRROR",
      icon: Database,
      x: 82,
      y: 35,
      color: "#3B82F6",
      connections: ["core"],
      details: ["SAP ERP dynamic mirror", "Continuous hot ledger"],
    },
    {
      id: "analytics",
      title: "Analytics Vault",
      role: "INTEL CORE",
      icon: BarChart3,
      x: 82,
      y: 65,
      color: "#14B8A6",
      connections: ["core", "api"],
      details: ["Vector anomaly metrics", "Daily forecast models"],
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-[#0A0A0A] bg-grid-dots overflow-hidden">
      
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 w-full pt-10">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-brand-purple">
            ACTIVE PIPELINE MESH
          </span>
          <h2 className="text-xl md:text-2xl font-montserrat font-light tracking-tight mt-1 text-white">
            ENTERPRISE AUTOMATION GRID
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 text-[8px] text-gray-600 font-mono">
          Hover individual modules to query packet flows.
        </div>
      </div>

      {/* Interactive Grid Canvas */}
      <div className="relative flex-1 w-full my-4 min-h-[300px] z-10">
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
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth="1"
                  />
                  <line
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isFlowing ? node.color : "rgba(255, 255, 255, 0.08)"}
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
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div 
                data-cursor="pointer"
                className="relative group cursor-pointer"
              >
                {/* Micro Border card */}
                <div 
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded border bg-[#0C0C0C] backdrop-blur-md transition-all duration-300"
                  style={{
                    borderColor: isNodeHovered ? node.color : "rgba(255,255,255,0.06)",
                    boxShadow: isNodeHovered ? `0 0 12px ${node.color}15` : "none",
                  }}
                >
                  <div 
                    className="p-1.5 rounded transition-colors duration-300"
                    style={{
                      backgroundColor: isNodeHovered ? `${node.color}15` : "rgba(255,255,255,0.03)",
                      color: isNodeHovered ? node.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[8px] font-mono tracking-widest text-gray-600 leading-none">
                      {node.role}
                    </h3>
                    <p className="text-xs font-light tracking-wide text-white mt-1">
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
      <div className="h-14 z-10 w-full border-t border-white/5 flex items-center justify-between px-2 font-mono text-[9px] text-gray-500 overflow-hidden">
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              key={hoveredNode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-row items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span 
                  className="px-1.5 py-0.5 rounded text-[8px]"
                  style={{
                    backgroundColor: `${nodes.find(n => n.id === hoveredNode)?.color}15`,
                    color: nodes.find(n => n.id === hoveredNode)?.color
                  }}
                >
                  SYS:{hoveredNode.toUpperCase()}
                </span>
                <span className="text-[#8E8E8E] hidden md:inline">Synchronous dynamic routing core validation.</span>
              </div>

              <div className="flex gap-4">
                {nodes.find(n => n.id === hoveredNode)?.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-gray-400">
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
              className="flex items-center justify-center w-full gap-2 text-gray-600 uppercase"
            >
              <Network className="w-3.5 h-3.5 text-brand-purple" />
              Hover node points to analyze pipeline statistics.
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
