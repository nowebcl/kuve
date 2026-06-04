"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, FileCode, Terminal, Globe, Layers } from "lucide-react";

interface SlideHeroProps {
  onInitiateProject: () => void;
}

export default function SlideHero({ onInitiateProject }: SlideHeroProps) {
  const [activeTab, setActiveTab] = useState<"editor" | "agents" | "terminal" | "browser">("agents");
  const [agentStep, setAgentStep] = useState(0);
  const [editorCode, setEditorCode] = useState("");
  const [isLight, setIsLight] = useState(false);
  
  const fullCode = `// Optimización de rendimiento
import { DatabaseHelper } from "@/lib/db";

export async function POST(req: Request) {
  const manager = new DatabaseHelper({
    caching: true,
    preload: "active"
  });

  const analytics = await manager.analyze([
    "Consultas optimizadas",
    "Índices indexados",
    "Limpieza de redundancias"
  ]);

  return Response.json({ status: "ready", analytics });
}`;

  // MutationObserver to listen to class changes on the html tag for light/dark theme toggles
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Typing effect when editor tab is active
  useEffect(() => {
    if (activeTab === "editor") {
      let i = 0;
      setEditorCode("");
      const timer = setInterval(() => {
        if (i < fullCode.length) {
          setEditorCode(fullCode.slice(0, i + 2));
          i += 2;
        } else {
          timer && clearInterval(timer);
        }
      }, 15);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  // Automated agent simulation steps
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStep((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-transparent overflow-hidden">
      
      {/* Subtle faint ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-brand-purple/10 via-brand-violet/5 to-transparent rounded-full blur-[120px] pointer-events-none opacity-30" />

      {/* Top running status bar */}
      <div className="flex items-center justify-between z-10 w-full pt-10 px-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="text-[10px] font-sans tracking-wider" style={{ color: "var(--text-muted)" }}>
            Santiago de Chile // Ingeniería de Software Avanzada
          </span>
        </motion.div>
      </div>

      {/* Split layout: Text on Left / Workspace Mockup on Right */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 w-full max-w-7xl mx-auto px-2">
        
        {/* Left Side: Brand & Call to Action */}
        <div className="lg:col-span-5 flex flex-col text-left items-start space-y-6 pt-4 lg:pt-0">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 select-none pointer-events-none"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-transparent animate-logo-hologram">
              <img 
                src="/logo.png" 
                alt="KUVE Symbol" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-brand-purple text-[10px] font-sans font-semibold tracking-wider uppercase">Kuve</span>
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-poppins font-bold tracking-tight leading-[1.1]">
            <span className="block transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
              Construye de una
            </span>
            <span className="bg-gradient-to-r from-brand-violet via-brand-purple to-brand-magenta bg-clip-text text-transparent">
              manera nueva.
            </span>
          </h1>

          <p className="text-xs md:text-sm font-light leading-[1.6] max-w-md font-sans transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>
            Desarrollo de software corporativo de alto rendimiento y automatización avanzada con agentes autónomos. Diseñamos, orquestamos y validamos soluciones de nivel empresarial con integraciones eficientes.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onInitiateProject}
              data-cursor="pointer"
              className="group relative px-6 py-3 rounded border text-[11px] transition-all duration-300 active:scale-97 font-semibold cursor-pointer"
              style={{
                borderColor: "var(--panel-border)",
                backgroundColor: "var(--panel-bg)",
                color: "var(--text-primary)",
              }}
            >
              Iniciar Proyecto →
            </button>
            <button
              onClick={onInitiateProject}
              className="px-6 py-3 rounded border bg-transparent text-[11px] transition-all duration-300 cursor-pointer font-medium"
              style={{
                borderColor: "var(--panel-border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--panel-border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              Ver Servicios
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Real-Time Workspace Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 w-full h-[400px] max-w-2xl rounded-xl overflow-hidden border shadow-2xl flex flex-col transition-all duration-300"
          style={{
            backgroundColor: "var(--panel-bg)",
            borderColor: "var(--panel-border)",
          }}
        >
          {/* OS Title Bar */}
          <div className="h-10 border-b px-4 flex items-center justify-between select-none" style={{ backgroundColor: isLight ? "rgba(0,0,0,0.01)" : "rgba(0,0,0,0.02)", borderColor: "var(--panel-border)" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/30" />
              <span className="text-[9px] font-sans tracking-wide ml-2" style={{ color: "var(--text-muted)" }}>entorno-de-desarrollo ~ kuve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[7.5px] font-sans text-brand-purple uppercase tracking-wider font-semibold">Simulación de Ejecución</span>
            </div>
          </div>

          {/* IDE Core area */}
          <div className="flex-1 flex row overflow-hidden">
            {/* Tab sidebar */}
            <div className="w-12 border-r flex flex-col items-center py-4 justify-between select-none" style={{ backgroundColor: isLight ? "rgba(0,0,0,0.005)" : "rgba(0,0,0,0.01)", borderColor: "var(--panel-border)" }}>
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveTab("agents")} 
                  className="p-2 rounded block transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeTab === "agents" ? "rgba(168, 85, 247, 0.05)" : "transparent",
                    color: activeTab === "agents" ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                  title="Orquestación"
                >
                  <Cpu className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("editor")} 
                  className="p-2 rounded block transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeTab === "editor" ? "rgba(99, 102, 241, 0.05)" : "transparent",
                    color: activeTab === "editor" ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                  title="Editor"
                >
                  <FileCode className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("terminal")} 
                  className="p-2 rounded block transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeTab === "terminal" ? "rgba(255, 255, 255, 0.03)" : "transparent",
                    color: activeTab === "terminal" ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                  title="Consola"
                >
                  <Terminal className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("browser")} 
                  className="p-2 rounded block transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeTab === "browser" ? "rgba(236, 72, 153, 0.05)" : "transparent",
                    color: activeTab === "browser" ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                  title="Vista Previa"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[7px] font-sans select-none" style={{ color: "var(--text-muted)" }}>v2.4</div>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 p-4 overflow-y-auto font-sans text-[10px] transition-all" style={{ backgroundColor: isLight ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.03)", color: "var(--text-primary)" }}>
              
              {/* Tab Header bar */}
              <div className="flex border-b pb-2 mb-3 gap-2 overflow-x-auto text-[8px] tracking-wider select-none font-sans font-semibold" style={{ borderColor: "var(--panel-border)" }}>
                <button 
                  onClick={() => setActiveTab("agents")} 
                  className="px-2 py-0.5 rounded border transition-colors cursor-pointer"
                  style={{
                    borderColor: activeTab === "agents" ? "rgba(168, 85, 247, 0.3)" : "var(--panel-border)",
                    backgroundColor: activeTab === "agents" ? "rgba(168, 85, 247, 0.03)" : "transparent",
                    color: activeTab === "agents" ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  Orquestación
                </button>
                <button 
                  onClick={() => setActiveTab("editor")} 
                  className="px-2 py-0.5 rounded border transition-colors cursor-pointer"
                  style={{
                    borderColor: activeTab === "editor" ? "rgba(99, 102, 241, 0.3)" : "var(--panel-border)",
                    backgroundColor: activeTab === "editor" ? "rgba(99, 102, 241, 0.03)" : "transparent",
                    color: activeTab === "editor" ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  Código
                </button>
                <button 
                  onClick={() => setActiveTab("terminal")} 
                  className="px-2 py-0.5 rounded border transition-colors cursor-pointer"
                  style={{
                    borderColor: activeTab === "terminal" ? "rgba(15, 23, 42, 0.1)" : "var(--panel-border)",
                    backgroundColor: activeTab === "terminal" ? "rgba(15, 23, 42, 0.02)" : "transparent",
                    color: activeTab === "terminal" ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  Consola
                </button>
                <button 
                  onClick={() => setActiveTab("browser")} 
                  className="px-2 py-0.5 rounded border transition-colors cursor-pointer"
                  style={{
                    borderColor: activeTab === "browser" ? "rgba(236, 72, 153, 0.3)" : "var(--panel-border)",
                    backgroundColor: activeTab === "browser" ? "rgba(236, 72, 153, 0.03)" : "transparent",
                    color: activeTab === "browser" ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  Vista Previa
                </button>
              </div>

              {/* Active content block */}
              <div className="h-[280px]">
                
                {/* 1. AGENTS TAB */}
                {activeTab === "agents" && (
                  <div className="space-y-4 text-[10px]">
                    <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--panel-border)" }}>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-brand-purple" />
                        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Centro de Operaciones</span>
                      </div>
                    </div>

                    {/* Simulation logs */}
                    <div className="space-y-2 font-sans text-[9px] leading-relaxed">
                      
                      {/* Node 1 */}
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-500 font-semibold">✔</span>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>[09:12]</span> <span className="text-brand-violet font-semibold">Agente Director:</span> Inicializando plan de optimización
                        </div>
                      </div>

                      {/* Node 2 */}
                      {agentStep >= 1 && (
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-500 font-semibold">✔</span>
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>[09:12]</span> <span className="text-brand-purple font-semibold">Agente Investigador:</span> Completó análisis estructural del código base
                          </div>
                        </div>
                      )}

                      {/* Node 3 */}
                      {agentStep >= 2 && (
                        <div className="flex items-start gap-2">
                          <span className="text-brand-violet">●</span>
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>[09:12]</span> <span className="text-brand-violet font-semibold">Agente Director:</span> Asignando refactorización al Agente de Código
                          </div>
                        </div>
                      )}

                      {/* Node 4 */}
                      {agentStep >= 3 && (
                        <div className="flex items-start gap-2">
                          <span className="text-brand-purple animate-pulse">⟲</span>
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>[09:12]</span> <span className="text-brand-magenta font-semibold">Agente de Código:</span> Escribiendo código de optimización de datos...
                            <div className="w-48 h-1 rounded-full mt-1 overflow-hidden relative" style={{ backgroundColor: "var(--panel-border)" }}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 2.5 }}
                                className="h-full bg-brand-purple" 
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Node 5 */}
                      {agentStep >= 4 && (
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-500 font-semibold">✔</span>
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>[09:12]</span> <span className="text-[#A855F7] font-semibold">Agente de Pruebas:</span> Pruebas unitarias de flujo completadas con éxito
                          </div>
                        </div>
                      )}

                      {/* Node 6 */}
                      {agentStep >= 5 && (
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-500 font-semibold">✔</span>
                          <div>
                            <span className="text-emerald-500 font-semibold">Consola:</span> Proceso terminado. Cambios consolidados de forma segura.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. EDITOR TAB */}
                {activeTab === "editor" && (
                  <div className="h-full overflow-y-auto">
                    <pre className="font-mono leading-relaxed overflow-x-auto whitespace-pre select-all pr-2" style={{ color: isLight ? "#1E293B" : "#D1D5DB" }}>
                      <code>{editorCode}</code>
                      <span className="typing-cursor ml-0.5" />
                    </pre>
                  </div>
                )}

                {/* 3. TERMINAL TAB */}
                {activeTab === "terminal" && (
                  <div className="space-y-1.5 text-[9px] leading-relaxed font-mono" style={{ color: isLight ? "#334155" : "#9CA3AF" }}>
                    <div>kuve-cl@0.1.0: ejecutando empaquetado final</div>
                    <div style={{ color: "var(--text-muted)" }}>Compilando módulos estáticos de producción...</div>
                    <div className="text-brand-purple">- Ruta local: http://localhost:3000</div>
                    <div className="text-emerald-600 dark:text-emerald-400">✓ Compilación completada con éxito en 3.2 segundos</div>
                    {agentStep >= 3 && (
                      <>
                        <div className="text-brand-purple">Recargando módulo optimizado: src/lib/opt.ts</div>
                        <div className="text-emerald-600 dark:text-emerald-400">✓ Módulos calientes integrados de forma estable</div>
                      </>
                    )}
                    {agentStep >= 4 && (
                      <>
                        <div style={{ color: "var(--text-muted)" }}>Ejecutando verificaciones del sistema...</div>
                        <div className="text-emerald-600 dark:text-emerald-400">✔ Conexión de base de datos activa: Correcto</div>
                        <div className="text-emerald-600 dark:text-emerald-400">✔ Pasarela de tokens de seguridad: Correcto</div>
                      </>
                    )}
                    <span className="typing-cursor ml-0.5" />
                  </div>
                )}

                {/* 4. BROWSER TAB */}
                {activeTab === "browser" && (
                  <div className="w-full h-full flex flex-col border rounded overflow-hidden" style={{ backgroundColor: "var(--background)", borderColor: "var(--panel-border)" }}>
                    {/* Simulated browser navbar */}
                    <div className="h-6 px-2 flex items-center justify-between border-b select-none" style={{ backgroundColor: isLight ? "#F1F5F9" : "rgba(0,0,0,0.03)", borderColor: "var(--panel-border)" }}>
                      <div className="flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/20" />
                      </div>
                      <div className="flex-1 max-w-[200px] h-3.5 rounded px-2 text-[6.5px] flex items-center justify-center font-sans font-medium" style={{ backgroundColor: isLight ? "#FFFFFF" : "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
                        kuve.cl/dashboard
                      </div>
                      <div className="w-3 h-3 text-[#555] font-light">⟲</div>
                    </div>
                    {/* Render visual preview */}
                    <div className="flex-1 flex flex-col justify-center items-center bg-dot-mesh p-4 select-none relative" style={{ backgroundColor: isLight ? "#FFFFFF" : "transparent" }}>
                      <div className="text-center space-y-2">
                        <div className="inline-block p-1.5 rounded bg-brand-purple/15 text-brand-purple border border-brand-purple/20">
                          <Layers className="w-6 h-6" />
                        </div>
                        <h4 className="text-xs font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>PANEL DE OPERACIONES</h4>
                        <p className="text-[7.5px] font-sans max-w-xs mx-auto" style={{ color: "var(--text-secondary)" }}>
                          Métricas globales de la plataforma y rendimiento de carga. Estado general de las integraciones tecnológicas operando con normalidad.
                        </p>
                        
                        <div className="flex gap-2 justify-center pt-2">
                          <div className="px-2 py-1 rounded border" style={{ backgroundColor: isLight ? "#F8FAFC" : "var(--panel-bg)", borderColor: "var(--panel-border)" }}>
                            <div className="text-[9px] font-bold" style={{ color: "var(--text-primary)" }}>99.8%</div>
                            <div className="text-[6px]" style={{ color: "var(--text-muted)" }}>OPTIMIZADO</div>
                          </div>
                          <div className="px-2 py-1 rounded border" style={{ backgroundColor: isLight ? "#F8FAFC" : "var(--panel-bg)", borderColor: "var(--panel-border)" }}>
                            <div className="text-[9px] text-emerald-600 dark:text-emerald-500 font-bold">120ms</div>
                            <div className="text-[6px]" style={{ color: "var(--text-muted)" }}>RESPUESTA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </motion.div>
        
      </div>

      {/* Bottom status indicators */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between border-t pt-4 z-10 gap-2" style={{ borderColor: "var(--panel-border)" }}>
        <div className="flex gap-6 text-[9px] uppercase tracking-widest font-medium font-sans" style={{ color: "var(--text-muted)" }}>
          <div>Santiago, Chile</div>
          <div>Seguridad y Respaldo Garantizados</div>
        </div>
        
        <div className="text-[9px] font-sans tracking-wide uppercase flex items-center gap-1.5 font-normal" style={{ color: "var(--text-muted)" }}>
          Desliza para explorar
        </div>
      </div>
    </div>
  );
}
