import { useNavigate } from "react-router-dom"
import { Upload, Camera } from "lucide-react"

export default function DemoCTA() {
  const nav = useNavigate()

  return (
    <section style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "64px 48px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(74,150,80,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.5px", position: "relative" }}>Start Analysing Your Cattle</h3>
        <p style={{ color: "var(--text2)", marginBottom: 32, fontWeight: 300, position: "relative" }}>Upload an image or use your webcam for real-time breed identification and weight estimation.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <button onClick={() => nav("/breed")} style={{
            padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            background: "var(--green)", color: "#fff", border: "none", cursor: "pointer",
            fontFamily: "var(--font-body)", transition: "var(--transition)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--green-light)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "none"; }}
          ><Upload size={16} /> Upload Image</button>
          <button onClick={() => nav("/breed")} style={{
            padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 500,
            background: "transparent", color: "var(--text)", border: "1px solid var(--border2)",
            cursor: "pointer", fontFamily: "var(--font-body)", transition: "var(--transition)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}><Camera size={16} /> Use Live Camera</button>
        </div>
      </div>
    </section>
  )
}
