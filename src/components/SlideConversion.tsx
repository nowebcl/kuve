"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Calculator, AlertTriangle } from "lucide-react";

export default function SlideConversion() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [objective, setObjective] = useState("Desarrollo Web");
  const [scale, setScale] = useState("$5M - $12M CLP");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [isLight, setIsLight] = useState(false);

  // Quoter state for the Standby panel
  const [quoterComplexity, setQuoterComplexity] = useState(3);
  const [quoterFeatures, setQuoterFeatures] = useState({
    auth: true,
    db: true,
    ai: false,
    security: false
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company || !name) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const objectives = ["Desarrollo Web", "App Móvil", "Software Empresarial", "Automatización IA"];
  const scales = ["Hasta $5M CLP", "$5M - $12M CLP", "$12M+ CLP"];

  // Interactive price estimation calculation
  const calculatedEstimate = useMemo(() => {
    let base = 3000000; // Web standard base
    if (objective === "App Móvil") base = 5000000;
    if (objective === "Software Empresarial") base = 8000000;
    if (objective === "Automatización IA") base = 10000000;

    let multiplier = 0.7 + (quoterComplexity * 0.2); // complexity scale
    
    let addOns = 0;
    if (quoterFeatures.auth) addOns += 600000;
    if (quoterFeatures.db) addOns += 1200000;
    if (quoterFeatures.ai) addOns += 2500000;
    if (quoterFeatures.security) addOns += 1800000;

    const total = Math.round(base * multiplier + addOns);
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(total);
  }, [objective, quoterComplexity, quoterFeatures]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-transparent overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-brand-purple/5 via-brand-violet/5 to-transparent rounded-full blur-[90px] pointer-events-none opacity-20" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 w-full pt-10 px-2">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-brand-violet font-semibold">
            03 // PRESUPUESTO Y CONTACTO
          </span>
          <h2 className="text-xl md:text-2xl font-poppins font-bold tracking-tight mt-1 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            Solicita tu Presupuesto.
          </h2>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 items-center justify-center my-4 z-10 w-full px-2">
        
        {/* Left Side: Contact Form */}
        <div className="w-full lg:w-[58%] max-w-xl border rounded-lg p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl transition-all duration-300" style={{ backgroundColor: "var(--panel-bg)", borderColor: "var(--panel-border)" }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form key="form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* 01. Objective selector */}
                <div className="space-y-2">
                  <label className="text-[9px] font-sans tracking-wide block font-semibold" style={{ color: "var(--text-secondary)" }}>
                    01. Tipo de Desarrollo
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {objectives.map((obj) => (
                      <button
                        type="button"
                        key={obj}
                        onClick={() => setObjective(obj)}
                        data-cursor="pointer"
                        className="px-3.5 py-2 text-[10px] font-sans rounded border transition-all duration-300 font-medium cursor-pointer"
                        style={{
                          borderColor: objective === obj ? "rgba(168, 85, 247, 0.6)" : "var(--panel-border)",
                          backgroundColor: objective === obj ? "rgba(168, 85, 247, 0.04)" : "transparent",
                          color: objective === obj ? "var(--text-primary)" : "var(--text-secondary)",
                        }}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 02. Scale selector */}
                <div className="space-y-2">
                  <label className="text-[9px] font-sans tracking-wide block font-semibold" style={{ color: "var(--text-secondary)" }}>
                    02. Rango Presupuestario
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scales.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setScale(s)}
                        data-cursor="pointer"
                        className="px-3.5 py-2 text-[10px] font-sans rounded border transition-all duration-300 font-medium cursor-pointer"
                        style={{
                          borderColor: scale === s ? "rgba(236, 72, 153, 0.6)" : "var(--panel-border)",
                          backgroundColor: scale === s ? "rgba(236, 72, 153, 0.04)" : "transparent",
                          color: scale === s ? "var(--text-primary)" : "var(--text-secondary)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 03. Inputs */}
                <div className="space-y-4 pt-2">
                  <label className="text-[9px] font-sans tracking-wide block font-semibold" style={{ color: "var(--text-secondary)" }}>
                    03. Tus Datos
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      required
                      type="text"
                      placeholder="Nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none px-0 py-2 text-xs placeholder-gray-400 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0 font-normal font-sans"
                      style={{ color: "var(--text-primary)", borderColor: "var(--panel-border)" }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Empresa o Institución"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none px-0 py-2 text-xs placeholder-gray-400 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0 font-normal font-sans"
                      style={{ color: "var(--text-primary)", borderColor: "var(--panel-border)" }}
                    />
                  </div>

                  <input
                    required
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none px-0 py-2 text-xs placeholder-gray-400 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0 font-normal font-sans"
                    style={{ color: "var(--text-primary)", borderColor: "var(--panel-border)" }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="pointer"
                  className="group w-full relative py-3 rounded border text-xs font-sans tracking-wide transition-all duration-300 active:scale-99 font-semibold cursor-pointer"
                  style={{
                    borderColor: "var(--panel-border)",
                    backgroundColor: "var(--background)",
                    color: "var(--text-primary)"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--panel-border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send className="w-3 h-3 text-brand-purple transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              /* Confirmation */
              <div className="py-6 text-center space-y-4 font-sans">
                <div className="inline-flex p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-md font-bold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>
                  SOLICITUD ENVIADA
                </h3>
                <p className="text-xs font-sans leading-relaxed max-w-sm mx-auto font-light" style={{ color: "var(--text-secondary)" }}>
                  Tu solicitud ha sido recibida con éxito. Un consultor se contactará contigo para iniciar el proceso de revisión.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  data-cursor="pointer"
                  className="px-5 py-2.5 rounded border text-[10px] tracking-wide uppercase transition-all font-sans font-semibold cursor-pointer"
                  style={{
                    borderColor: "var(--panel-border)",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    color: "var(--text-primary)"
                  }}
                >
                  Regresar
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Interactive Quote Calculator (STANDBY MÓDULO) */}
        <div className="w-full lg:w-[42%] flex flex-col justify-between self-stretch border rounded-lg p-6 backdrop-blur-sm font-sans text-[10px] shadow-xl relative overflow-hidden transition-all duration-300" style={{ backgroundColor: "var(--panel-bg)", borderColor: "var(--panel-border)" }}>
          
          <div className="space-y-4">
            {/* Standby Header */}
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--panel-border)" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Calculator className="w-4 h-4 text-brand-purple" />
                <span className="font-bold uppercase tracking-wider text-[11px]">Cotizador Estimado</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/5 text-[8px] text-amber-500 font-sans font-semibold select-none">
                <AlertTriangle className="w-2.5 h-2.5" />
                STANDBY
              </div>
            </div>

            <p className="text-[11px] font-normal leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Calcula un presupuesto dinámico para tu proyecto en pesos chilenos ($ CLP) ajustando los parámetros de complejidad y adiciones requeridas.
            </p>

            {/* Simulated interactive sliders and checkboxes */}
            <div className="space-y-4 pt-2">
              
              {/* Complexity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-medium" style={{ color: "var(--text-secondary)" }}>
                  <span>Nivel de Complejidad: {quoterComplexity}/5</span>
                  <span>Factor de Red: x{(0.7 + quoterComplexity * 0.2).toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={quoterComplexity} 
                  onChange={(e) => setQuoterComplexity(Number(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1.5">
                <span className="text-[9px] block font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Módulos y Adicionales
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-[9px] font-medium">
                  
                  {/* Database */}
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded border transition-colors select-none" style={{ borderColor: "var(--panel-border)", backgroundColor: isLight ? "#FFFFFF" : "rgba(0,0,0,0.01)" }}>
                    <input 
                      type="checkbox" 
                      checked={quoterFeatures.db}
                      onChange={() => setQuoterFeatures(prev => ({ ...prev, db: !prev.db }))}
                      className="accent-brand-purple rounded cursor-pointer"
                    />
                    <span style={{ color: "var(--text-secondary)" }}>Base de Datos</span>
                  </label>

                  {/* Auth */}
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded border transition-colors select-none" style={{ borderColor: "var(--panel-border)", backgroundColor: isLight ? "#FFFFFF" : "rgba(0,0,0,0.01)" }}>
                    <input 
                      type="checkbox" 
                      checked={quoterFeatures.auth}
                      onChange={() => setQuoterFeatures(prev => ({ ...prev, auth: !prev.auth }))}
                      className="accent-brand-purple rounded cursor-pointer"
                    />
                    <span style={{ color: "var(--text-secondary)" }}>Autenticación</span>
                  </label>

                  {/* AI */}
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded border transition-colors select-none" style={{ borderColor: "var(--panel-border)", backgroundColor: isLight ? "#FFFFFF" : "rgba(0,0,0,0.01)" }}>
                    <input 
                      type="checkbox" 
                      checked={quoterFeatures.ai}
                      onChange={() => setQuoterFeatures(prev => ({ ...prev, ai: !prev.ai }))}
                      className="accent-brand-purple rounded cursor-pointer"
                    />
                    <span style={{ color: "var(--text-secondary)" }}>Integración IA</span>
                  </label>

                  {/* Security */}
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded border transition-colors select-none" style={{ borderColor: "var(--panel-border)", backgroundColor: isLight ? "#FFFFFF" : "rgba(0,0,0,0.01)" }}>
                    <input 
                      type="checkbox" 
                      checked={quoterFeatures.security}
                      onChange={() => setQuoterFeatures(prev => ({ ...prev, security: !prev.security }))}
                      className="accent-brand-purple rounded cursor-pointer"
                    />
                    <span style={{ color: "var(--text-secondary)" }}>Seguridad SOC2</span>
                  </label>

                </div>
              </div>

              {/* Large calculated display */}
              <div className="p-4 border rounded-lg text-center space-y-1 mt-4 relative" style={{ backgroundColor: isLight ? "#F8FAFC" : "rgba(0,0,0,0.02)", borderColor: "var(--panel-border)" }}>
                <span className="text-[9px] block uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                  Presupuesto Estimado
                </span>
                <span className="text-xl md:text-2xl font-bold font-sans tracking-wide" style={{ color: "var(--text-primary)" }}>
                  {calculatedEstimate}
                </span>
                <span className="text-[8px] font-sans block" style={{ color: "var(--text-muted)" }}>
                  CLP (Estimado aproximado)
                </span>
              </div>

            </div>
          </div>

          {/* Standby warning note */}
          <div className="border-t pt-3 mt-4 flex items-center justify-between text-[8px] leading-relaxed" style={{ borderColor: "var(--panel-border)", color: "var(--text-muted)" }}>
            <div className="flex gap-1 items-start text-amber-600 dark:text-amber-500 font-semibold font-sans">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Módulo en standby de cotización. Sujeto a validación final.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4 z-10 w-full" style={{ borderColor: "var(--panel-border)" }}>
        <div className="text-[9px] font-sans uppercase tracking-wider font-normal" style={{ color: "var(--text-muted)" }}>
          Formulario de contacto seguro // Presupuestos calculados en pesos chilenos ($ CLP).
        </div>
        <div className="mt-1 sm:mt-0 text-[9px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
          KUVE.CL
        </div>
      </div>

    </div>
  );
}
