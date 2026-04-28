import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import UploadPanel from "../components/UploadPanel"
import ResultPanel from "../components/ResultPanel"
import { Upload } from "lucide-react"

export default function BreedPredict() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <Navbar />
      <div style={{ padding: "96px 48px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--text3)" }}>//</span> Breed Prediction
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 8, color: "var(--text)" }}>Breed Prediction</h2>
        <p style={{ color: "var(--text2)", fontWeight: 300, marginBottom: 24 }}>Upload an image to identify cattle breed with confidence scores and GradCAM heatmap.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <UploadPanel onResult={setResult} onLoading={setLoading} singleImage />
          <ResultPanel result={result} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
