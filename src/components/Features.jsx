import { ScanSearch, Brain, Flame, Scale } from "lucide-react"

const cards = [
  { icon: ScanSearch, color: "var(--cyan)", bg: "rgba(56,201,212,0.12)", title: "Cattle Detection", desc: "Automatically detects and localizes cattle in images using a YOLOv8 object detection model, cropping the region of interest for downstream analysis." },
  { icon: Brain, color: "var(--green-light)", bg: "rgba(74,150,80,0.15)", title: "Breed Prediction", desc: "Identifies 20 Indian cattle breeds from images using a fine-tuned ConvNeXt-Base deep learning model trained on a curated cattle dataset." },
  { icon: Flame, color: "var(--amber)", bg: "rgba(232,160,32,0.1)", title: "GradCAM Visualization", desc: "Generates gradient-weighted class activation maps to visually explain which regions of the image influenced the model's prediction." },
  { icon: Scale, color: "var(--green-light)", bg: "rgba(74,150,80,0.15)", title: "Weight Estimation", desc: "Estimates live body weight using keypoint detection and segmentation to extract body morphometrics from side and rear cattle images." },
]

export default function Features() {
  return (
    <section style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "var(--text3)" }}>//</span> Capabilities
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 16, color: "var(--text)", lineHeight: 1.1 }}>Core Features</h2>
      <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 520, fontWeight: 300, lineHeight: 1.7 }}>A complete AI pipeline covering detection, classification, explainability, and estimation.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>
        {cards.map(({ icon: Icon, color, bg, title, desc, badge }) => (
          <div key={title} style={{
            padding: 28, borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)", background: "var(--surface)",
            transition: "var(--transition)", position: "relative", overflow: "hidden",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <Icon size={20} color={color} />
            </div>
            <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.3px" }}>{title}</h3>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.65, fontWeight: 300 }}>{desc}</p>
            {badge && <span style={{ display: "inline-block", marginTop: 14, fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "rgba(232,160,32,0.15)", color: "var(--amber)", fontFamily: "var(--font-mono)" }}>{badge}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
