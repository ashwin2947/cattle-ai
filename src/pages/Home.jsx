import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Pipeline from "../components/Pipeline"
import DemoCTA from "../components/DemoCTA"
import Footer from "../components/Footer"
import { ArrowRight, Monitor, Server, Brain, Tractor, Microscope, BarChart2, Milk } from "lucide-react"

const divider = <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />

function About() {
  const chips = [
    { icon: Tractor, label: "Farmers" },
    { icon: Microscope, label: "Veterinarians" },
    { icon: BarChart2, label: "Researchers" },
    { icon: Milk, label: "Dairy Industry" },
  ]

  return (
    <section id="about-section" style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "var(--text3)" }}>//</span> About
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 16, color: "var(--text)", lineHeight: 1.1 }}>What is this system?</h2>
      <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 520, fontWeight: 300, lineHeight: 1.7 }}>An end-to-end AI pipeline for cattle analysis — from image input to breed identification and physical trait estimation.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48, alignItems: "stretch" }}>
        <div>
          <p style={{ color: "var(--text2)", fontWeight: 300, lineHeight: 1.8, fontSize: 15 }}>
            This project combines <strong style={{ color: "var(--green-light)", fontWeight: 500 }}>YOLO object detection</strong> with{" "}
            <strong style={{ color: "var(--cyan)", fontWeight: 500 }}>EfficientNet classification</strong> to identify cattle breeds from images, enhanced with GradCAM heatmaps that explain the model's decision-making process.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Automatic cattle detection and cropping from images",
              "Deep learning breed classification with confidence scores",
              "Visual explanations using GradCAM heatmaps",
              "Weight estimation from body morphometrics",
            ].map(item => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "var(--text2)", fontWeight: 300 }}>
                <ArrowRight size={15} color="var(--green)" style={{ flexShrink: 0, marginTop: 3 }} />{item}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 20, fontSize: 14, color: "var(--text3)" }}>Designed to assist:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {chips.map(({ icon: Icon, label }) => (
              <span key={label} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 13, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon size={13} color="var(--text3)" />{label}
              </span>
            ))}
          </div>
        </div>

        {/* visual */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: 320, marginTop: "-32px" }}>
          <img src="/banner.png" alt="Cattle" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  const cols = [
    { title: "Frontend", icon: Monitor, iconColor: "var(--green-light)", cls: "g", tags: ["React + Vite", "Tailwind CSS", "React Router", "Axios"] },
    { title: "Backend", icon: Server, iconColor: "var(--cyan)", cls: "b", tags: ["FastAPI", "Python 3.10", "Uvicorn", "OpenCV"] },
    { title: "Models", icon: Brain, iconColor: "var(--amber)", cls: "a", tags: ["YOLOv8", "ConvNeXt-Base (Breed)", "EfficientNet-B3 (Weight)", "GradCAM", "PyTorch"] },
  ]
  const tagStyle = {
    g: { background: "rgba(74,150,80,0.12)", color: "var(--green-light)", borderColor: "rgba(74,150,80,0.3)" },
    b: { background: "rgba(56,201,212,0.1)", color: "var(--cyan)", borderColor: "rgba(56,201,212,0.25)" },
    a: { background: "rgba(232,160,32,0.1)", color: "var(--amber)", borderColor: "rgba(232,160,32,0.25)" },
  }

  return (
    <section style={{ padding: "64px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "var(--text3)" }}>//</span> Architecture
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 16, color: "var(--text)", lineHeight: 1.1 }}>System Architecture</h2>
      <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 520, fontWeight: 300, lineHeight: 1.7 }}>Modern decoupled architecture with a React frontend and FastAPI backend serving the ML models.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 48 }}>
        {cols.map(({ title, icon: Icon, iconColor, cls, tags }) => (
          <div key={title} style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: tagStyle[cls].background, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} color={iconColor} />
              </div>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1 }}>{title}</h4>
            </div>
            {tags.map(t => (
              <span key={t} style={{ display: "inline-block", padding: "6px 12px", borderRadius: 6, margin: 4, fontSize: 13, fontWeight: 500, fontFamily: "var(--font-mono)", border: "1px solid", ...tagStyle[cls] }}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {divider}
      <About />
      {divider}
      <Features />
      {divider}
      <Pipeline />
      {divider}
      <Architecture />
      {divider}
      <DemoCTA />
      <Footer />
    </div>
  )
}
