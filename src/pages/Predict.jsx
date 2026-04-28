import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import UploadPanel from "../components/UploadPanel"
import ResultPanel from "../components/ResultPanel"
import CameraPanel from "../components/CameraPanel"
import { Upload, Camera } from "lucide-react"

export default function Predict() {
  const [mode, setMode] = useState("upload")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const tabBtn = (value, label) => (
    <button
      onClick={() => { setMode(value); setResult(null) }}
      style={{
        padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
        fontFamily: "var(--font-body)", cursor: "pointer", transition: "var(--transition)",
        border: mode === value ? "none" : "1px solid var(--border2)",
        background: mode === value ? "var(--green)" : "transparent",
        color: mode === value ? "#fff" : "var(--text2)",
        display: "inline-flex", alignItems: "center", gap: 7,
      }}
    >{label}</button>
  )

  return (
    <div>
      <Navbar />
      <div style={{ padding: "96px 48px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--text3)" }}>//</span> Analyse
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 8, color: "var(--text)" }}>Analysis Console</h2>
        <p style={{ color: "var(--text2)", fontWeight: 300, marginBottom: 24 }}>Upload an image or use your webcam to analyse cattle breed and estimate weight.</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {tabBtn("upload", <><Upload size={14} /> Image Upload</>)}
          {tabBtn("camera", <><Camera size={14} /> Live Capture</>)}
        </div>

        {mode === "upload" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <UploadPanel onResult={setResult} onLoading={setLoading} />
            <ResultPanel result={result} loading={loading} />
          </div>
        )}

        {mode === "camera" && <CameraPanel />}
      </div>
      <Footer />
    </div>
  )
}