import { useEffect, useRef } from "react"
import { Target, Flame } from "lucide-react"

export default function ResultPanel({ result, loading }) {
  const barRef = useRef()

  useEffect(() => {
    if (result && barRef.current) {
      setTimeout(() => { barRef.current.style.width = ((result.confidence || 0) * 100).toFixed(1) + "%" }, 100)
    }
  }, [result])

  const statusStyle = result
    ? { color: "var(--cyan)", borderColor: "rgba(56,201,212,0.4)", background: "rgba(56,201,212,0.08)" }
    : { color: "var(--text3)", borderColor: "var(--border)" }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px" }}>Breed Prediction</h3>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 10px", borderRadius: 100, border: "1px solid", ...statusStyle }}>
          {result ? "complete" : "awaiting input"}
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
            <p style={{ fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-mono)" }}>Running AI pipeline...</p>
          </div>
        )}

        {!result ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text3)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <Target size={40} strokeWidth={1.2} color="var(--text3)" />
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>Upload an image and run prediction</p>
          </div>
        ) : (
          <>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, background: "var(--bg2)" }}>
              <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Predicted Breed</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--green-light)", letterSpacing: "-0.5px" }}>{result.breed || "Unknown"}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 4, fontFamily: "var(--font-mono)" }}>Confidence: {((result.confidence || 0) * 100).toFixed(1)}%</div>
              <div style={{ height: 4, borderRadius: 2, background: "var(--surface2)", marginTop: 12, overflow: "hidden" }}>
                <div ref={barRef} style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, var(--green), var(--cyan))", width: "0%", transition: "width 1s ease" }} />
              </div>
            </div>

            {result.top_predictions?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Top Predictions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {result.top_predictions.map((p, i) => {
                    const pct = ((p.confidence || 0) * 100).toFixed(1)
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, color: "var(--text2)", minWidth: 140, fontFamily: "var(--font-mono)" }}>{p.breed}</span>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--surface2)", overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,var(--green),var(--cyan))", width: pct + "%", transition: "width 1s ease" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", minWidth: 36, textAlign: "right" }}>{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>GradCAM Heatmap</div>
              <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg2)", overflow: "hidden" }}>
                {result.gradcam ? (
                  <img src={`data:image/jpeg;base64,${result.gradcam}`} alt="GradCAM" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "var(--radius)" }} />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                      <Flame size={32} strokeWidth={1.2} color="var(--text3)" />
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>Heatmap will appear here after prediction</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
