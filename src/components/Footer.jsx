import { Beef } from "lucide-react"

export default function Footer() {
  return (
    <footer style={{
      padding: "20px 48px", borderTop: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12,
    }}>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
        <Beef size={14} color="var(--green-light)" />
        Cattle<span style={{ color: "var(--green-light)" }}>AI</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
        Final Year Project · AI & Computer Vision
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["React", "FastAPI", "PyTorch", "YOLO"].map(t => (
          <span key={t} style={{
            fontSize: 10, padding: "3px 8px", borderRadius: 4,
            border: "1px solid var(--border)", color: "var(--text3)", fontFamily: "var(--font-mono)",
          }}>{t}</span>
        ))}
      </div>
    </footer>
  )
}
