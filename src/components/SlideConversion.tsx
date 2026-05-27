"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, CheckCircle2, ShieldCheck, Mail, Building } from "lucide-react";

export default function SlideConversion() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [objective, setObjective] = useState("AI Agents");
  const [scale, setScale] = useState("$100k - $250k");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company || !name) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const objectives = ["AI Agents", "Core Software", "Robotic Dev"];
  const scales = ["$50k - $100k", "$100k - $250k", "$250k+"];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 bg-[#0A0A0A] bg-grid-dots overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-brand-magenta/5 via-brand-purple/5 to-transparent rounded-full blur-[80px] pointer-events-none opacity-30" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 w-full pt-10">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-brand-violet">
            COMMUNICATIONS
          </span>
          <h2 className="text-xl md:text-2xl font-montserrat font-light tracking-tight mt-1 text-white">
            CONVERSION MATRIX
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 text-[8px] text-gray-600 font-mono">
          Encrypted TLS channel active.
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 items-center justify-center my-4 z-10 w-full">
        
        {/* Underlined Minimalist Form */}
        <div className="w-full lg:w-[62%] max-w-2xl bg-[#0C0C0C]/50 border border-white/5 rounded p-6 md:p-8 backdrop-blur-md">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form key="form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* 01. Objective selector */}
                <div className="space-y-2">
                  <label className="text-[8px] font-mono uppercase tracking-[0.2em] text-gray-500 block">
                    01. Objective
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {objectives.map((obj) => (
                      <button
                        type="button"
                        key={obj}
                        onClick={() => setObjective(obj)}
                        data-cursor="pointer"
                        className="px-3 py-1.5 text-[9px] font-mono tracking-widest rounded border transition-all duration-300"
                        style={{
                          borderColor: objective === obj ? "rgba(168, 85, 247, 0.6)" : "rgba(255,255,255,0.06)",
                          backgroundColor: objective === obj ? "rgba(168, 85, 247, 0.05)" : "transparent",
                          color: objective === obj ? "#FFF" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 02. Scale selector */}
                <div className="space-y-2">
                  <label className="text-[8px] font-mono uppercase tracking-[0.2em] text-gray-500 block">
                    02. Scope Scale
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scales.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setScale(s)}
                        data-cursor="pointer"
                        className="px-3 py-1.5 text-[9px] font-mono tracking-widest rounded border transition-all duration-300"
                        style={{
                          borderColor: scale === s ? "rgba(236, 72, 153, 0.6)" : "rgba(255,255,255,0.06)",
                          backgroundColor: scale === s ? "rgba(236, 72, 153, 0.05)" : "transparent",
                          color: scale === s ? "#FFF" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 03. Delicate Underlined Credentials Inputs */}
                <div className="space-y-4 pt-2">
                  <label className="text-[8px] font-mono uppercase tracking-[0.2em] text-gray-500 block">
                    03. Core Credentials
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      required
                      type="text"
                      placeholder="Lead Executive Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none px-0 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Corporate Entity"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none px-0 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0"
                    />
                  </div>

                  <input
                    required
                    type="email"
                    placeholder="Communications Terminal (E-mail)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none px-0 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple transition-colors focus:ring-0 focus:ring-offset-0"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="pointer"
                  className="group w-full relative py-3 border border-white/10 hover:border-white/35 bg-[#0C0C0C] text-xs font-mono tracking-widest text-white transition-all duration-300 active:scale-99"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        HANDSHAKE...
                      </>
                    ) : (
                      <>
                        ESTABLISH HANDSHAKE
                        <Send className="w-3.5 h-3.5 text-brand-purple transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              /* Confirmation */
              <div className="py-6 text-center space-y-4 font-mono">
                <div className="inline-flex p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-md font-montserrat font-light text-white tracking-wide uppercase">
                  CONNECTION ESTABLISHED
                </h3>
                <p className="text-[10px] text-gray-500 font-sans leading-relaxed max-w-sm mx-auto">
                  Credentials accepted. An architect has been dispatched.
                </p>
                
                <div className="max-w-md mx-auto p-3.5 rounded border border-emerald-500/10 bg-emerald-500/5 text-[9px] text-emerald-400/80 text-left space-y-0.5">
                  <div>[SYS]: PROTOCOL TLS_1.3 INITIALIZED</div>
                  <div>[SYS]: ENCRYPTED ID: KUVE-{Math.floor(1000 + Math.random()*9000)}-SEC</div>
                  <div>[SYS]: TARGET: {name.toUpperCase()} @ {company.toUpperCase()}</div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  data-cursor="pointer"
                  className="px-4 py-2 border border-white/10 bg-white/5 text-[9px] text-white tracking-widest uppercase hover:bg-white/10 transition-all font-mono"
                >
                  Return
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Informative Panel */}
        <div className="w-full lg:w-[38%] flex flex-col justify-between self-stretch bg-[#0C0C0C]/20 border border-white/5 rounded p-6 backdrop-blur-sm font-mono text-[9px] text-gray-500">
          
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-white">
              <Terminal className="w-3.5 h-3.5 text-brand-purple" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">CORE SPECIFICATION</span>
            </div>

            <p className="text-gray-500 leading-relaxed font-sans text-[11px]">
              All communication channels are encrypted and sandboxed, guaranteeing intellectual asset preservation.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-violet shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold uppercase tracking-wider">SOC2 Standard</p>
                  <p className="text-gray-600 mt-0.5">Automated isolation protocols</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Building className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold uppercase tracking-wider">Local operations</p>
                  <p className="text-gray-600 mt-0.5">Santiago, Chile, global scale</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-magenta shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold uppercase tracking-wider">Response threshold</p>
                  <p className="text-gray-600 mt-0.5">Sub-4 hour architect contact</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-center uppercase tracking-wider">
            <span>[HOST]: KUVE.CL</span>
            <span className="text-emerald-500">SYS: STABLE</span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/5 pt-4 z-10 w-full">
        <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
          // CHANNELS SECURED UNDER TLS V1.3 METADATA COMPLIANT HANDSHAKE.
        </div>
        <div className="mt-1 sm:mt-0 text-[8px] font-mono text-gray-500 uppercase tracking-widest">
          SANTIAGO, METROPOLITANA, CL.
        </div>
      </div>

    </div>
  );
}
