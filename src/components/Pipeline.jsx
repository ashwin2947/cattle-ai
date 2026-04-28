import { ImageIcon, ScanSearch, Crop, Cpu, Flame, CheckCircle, ChevronRight, Scale, Crosshair, Layers } from "lucide-react"

const breedSteps = [
  { num: "01", icon: ImageIcon, label: "Input", sub: "Image Upload" },
  { num: "02", icon: ScanSearch, label: "YOLO", sub: "Detection" },
  { num: "03", icon: Crop, label: "Crop", sub: "ROI Extract" },
  { num: "04", icon: Cpu, label: "ConvNeXt", sub: "Breed Classification" },
  { num: "05", icon: Flame, label: "GradCAM", sub: "Visualization" },
  { num: "06", icon: CheckCircle, label: "Result", sub: "Breed + Score" },
]

const weightSteps = [
  { num: "01", icon: ImageIcon, label: "Input", sub: "Image Upload" },
  { num: "02", icon: ScanSearch, label: "YOLO", sub: "Detection" },
  { num: "03", icon: Crop, label: "Crop", sub: "ROI Extract" },
  { num: "04", icon: Crosshair, label: "Keypoint", sub: "Keypoint Detection" },
  { num: "05", icon: Layers, label: "Segment", sub: "Segmentation" },
  { num: "06", icon: Scale, label: "Estimate", sub: "Weight Estimation" },
]

function PipelineRow({ steps, color }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", overflowX: "auto", paddingBottom: 8 }}>
      {steps.map(({ num, icon: Icon, label, sub }, i) => (
        <div key={num} style={{
          flex: 1, minWidth: 120, padding: "24px 16px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderLeft: i === 0 ? "1px solid var(--border)" : "none",
          borderRadius: i === 0 ? "var(--radius) 0 0 var(--radius)" : i === steps.length - 1 ? "0 var(--radius) var(--radius) 0" : 0,
          textAlign: "center", position: "relative", transition: "var(--transition)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.zIndex = 1; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.zIndex = "auto"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", display: "block", marginBottom: 10 }}>{num}</span>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Icon size={22} color={color} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", fontFamily: "var(--font-head)", display: "block", marginBottom: 4 }}>{label}</span>
          <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>{sub}</span>
          {i < steps.length - 1 && (
            <div style={{
              position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)",
              width: 24, height: 24, background: "var(--bg)",
              border: "1px solid var(--border)", borderRadius: "50%", zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChevronRight size={12} color={color} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Pipeline() {
  return (
    <section style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "var(--text3)" }}>//</span> Pipeline
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 16, color: "var(--text)", lineHeight: 1.1 }}>How It Works</h2>
      <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 520, fontWeight: 300, lineHeight: 1.7 }}>Two independent deep learning pipelines — one for breed classification, one for weight estimation.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 48 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--green-light)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Breed Classification</div>
          <PipelineRow steps={breedSteps} color="var(--green-light)" />
        </div>
        <div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--cyan)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Weight Estimation</div>
          <PipelineRow steps={weightSteps} color="var(--cyan)" />
        </div>
      </div>
    </section>
  )
}
