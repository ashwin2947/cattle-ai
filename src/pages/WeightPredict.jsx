import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import UploadPanel from "../components/UploadPanel"
import { Scale, Target } from "lucide-react"

export default function WeightPredict() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const doneStyle = { color: "var(--cyan)", borderColor: "rgba(56,201,212,0.4)", background: "rgba(56,201,212,0.08)" }
  const idleStyle = { color: "var(--text3)", borderColor: "var(--border)" }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "96px 48px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--text3)" }}>//</span> Weight Estimation
        </div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 8, color: "var(--text)" }}>Weight Estimation</h2>
        <p style={{ color: "var(--text2)", fontWeight: 300, marginBottom: 24 }}>Upload a cattle image to estimate live body weight from body morphometrics.</p>

        {/* Reference sticker info banner */}
        <div style={{
          border: "1px solid rgba(232,160,32,0.35)", borderRadius: "var(--radius)",
          background: "rgba(232,160,32,0.07)", padding: "16px 20px", marginBottom: 24,
          display: "flex", gap: 14, alignItems: "flex-start",
        }}>
          <div style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: 8,
            background: "rgba(232,160,32,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 18 }}>🏷️</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--amber)", fontFamily: "var(--font-mono)", marginBottom: 4 }}>Reference Sticker Required</div>
            <p style={{ fontSize: 13, color: "var(--text2)", fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
              A <strong style={{ color: "var(--text)", fontWeight: 500 }}>reference sticker of known size</strong> must be visibly placed on the cattle before capturing the image.
              The model uses this sticker as a scale reference to calculate real-world body measurements and estimate live weight accurately.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {["Place sticker on the side of the body", "Ensure sticker is fully visible", "Use a flat, well-lit angle"].map(tip => (
                <span key={tip} style={{
                  fontSize: 11, fontFamily: "var(--font-mono)", padding: "3px 10px", borderRadius: 100,
                  border: "1px solid rgba(232,160,32,0.3)", color: "var(--amber)", background: "rgba(232,160,32,0.08)",
                }}>{tip}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <UploadPanel onResult={setResult} onLoading={setLoading} />

          {/* Weight result panel */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px" }}>Weight Estimation</h3>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 10px", borderRadius: 100, border: "1px solid", ...(result?.weight != null ? doneStyle : idleStyle) }}>
                {result?.weight != null ? "complete" : "awaiting input"}
              </span>
            </div>
            <div style={{ padding: 24, position: "relative" }}>
              {loading && (
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(17,24,17,0.85)",
                  backdropFilter: "blur(4px)", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", borderRadius: "var(--radius)", zIndex: 10,
                }}>
                  <div className="spinner" />
                  <p style={{ fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-mono)" }}>Estimating weight...</p>
                </div>
              )}
              {result?.weight != null ? (
                <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 28, background: "var(--bg2)", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>Estimated Live Weight</div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 56, fontWeight: 700, color: "var(--cyan)", letterSpacing: "-2px", lineHeight: 1 }}>
                    {result.weight}
                  </div>
                  <div style={{ fontSize: 18, color: "var(--text2)", fontFamily: "var(--font-mono)", marginTop: 8 }}>kg</div>
                  {result.remarks && (
                    <div style={{ marginTop: 16, fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-mono)", padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                      {result.remarks}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text3)" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                    <Scale size={40} strokeWidth={1.2} color="var(--text3)" />
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>Upload an image and run prediction</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
