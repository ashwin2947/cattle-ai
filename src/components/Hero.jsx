import { useNavigate } from "react-router-dom"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function Hero() {
  const nav = useNavigate()

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 48px 80px", position: "relative",
      textAlign: "center", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(74,150,80,0.12) 0%, transparent 70%),
                     radial-gradient(ellipse 50% 40% at 80% 70%, rgba(56,201,212,0.06) 0%, transparent 60%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at center, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at center, black 30%, transparent 70%)",
      }} />

      <div className="fade-in fade-in-1" style={{
        position: "relative", zIndex: 1,
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 16px", borderRadius: 100,
        border: "1px solid var(--border2)", background: "rgba(74,150,80,0.08)",
        fontSize: 13, fontWeight: 500, color: "var(--green-light)",
        marginBottom: 28, letterSpacing: "0.5px", fontFamily: "var(--font-mono)",
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%", background: "var(--green-light)",
          animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0,
        }} />
        Breed Classification & Weight Estimation · Computer Vision
      </div>

      <h1 className="fade-in fade-in-2" style={{
        position: "relative", zIndex: 1,
        fontFamily: "var(--font-head)", fontSize: "clamp(40px, 6vw, 76px)",
        fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 24,
        background: "linear-gradient(135deg, #e8f0e8 20%, var(--green-light) 60%, var(--cyan) 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>
        Cattle AI<br />Intelligence System
      </h1>

      <p className="fade-in fade-in-3" style={{
        position: "relative", zIndex: 1,
        fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text2)",
        maxWidth: 560, margin: "0 auto 40px", fontWeight: 300, lineHeight: 1.7,
      }}>
        AI-powered cattle breed classification and weight estimation using deep learning and computer vision
      </p>

      <div className="fade-in fade-in-4" style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => nav("/breed")} style={{
          padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600,
          background: "var(--green)", color: "#fff", border: "none", cursor: "pointer",
          fontFamily: "var(--font-body)", transition: "var(--transition)",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--green-light)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "none"; }}
        >Get Started <ArrowRight size={16} /></button>
        <button onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })} style={{
          padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 500,
          background: "transparent", color: "var(--text)", border: "1px solid var(--border2)",
          cursor: "pointer", fontFamily: "var(--font-body)", transition: "var(--transition)",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>Learn More <ChevronDown size={16} /></button>
      </div>

      <div className="fade-in fade-in-4" style={{ position: "relative", zIndex: 1, display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          ["20", "Cattle Breeds"],
          ["ConvNeXt", "Backbone"],
          ["GradCAM", "Explainability"],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 800, color: "var(--green-light)", letterSpacing: "-1px", display: "block" }}>{num}</span>
            <span style={{ fontSize: 12, color: "var(--text3)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
