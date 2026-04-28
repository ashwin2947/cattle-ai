import { useRef, useState, useEffect, useCallback } from "react"
import { Flame, Play, Square, ScanLine, AlertTriangle, Camera } from "lucide-react"
import ResultPanel from "./ResultPanel"

const LIVE_URL = "http://localhost:8000/live"

export default function CameraPanel() {
  const videoRef  = useRef()
  const canvasRef = useRef()
  const streamRef = useRef(null)
  const busyRef   = useRef(false)

  const [camOn,   setCamOn]   = useState(false)
  const [gradcam, setGradcam] = useState(false)
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")

  const captureAndPredict = useCallback(async () => {
    if (busyRef.current || !videoRef.current || !canvasRef.current) return
    busyRef.current = true

    const video  = videoRef.current
    const canvas = canvasRef.current
    canvas.width  = video.videoWidth  || 640
    canvas.height = video.videoHeight || 480
    canvas.getContext("2d").drawImage(video, 0, 0)

    canvas.toBlob(async (blob) => {
      if (!blob) { busyRef.current = false; return }
      setLoading(true)
      const form = new FormData()
      form.append("file", blob, "frame.jpg")
      try {
        const res = await fetch(LIVE_URL, { method: "POST", body: form })
        if (!res.ok) throw new Error()
        setResult(await res.json())
        setError("")
      } catch {
        setError("Unable to reach the server. Ensure the backend is running on localhost:8000.")
      } finally {
        setLoading(false)
        busyRef.current = false
      }
    }, "image/jpeg", 0.85)
  }, [])

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      streamRef.current = s
      videoRef.current.srcObject = s
      setCamOn(true)
      setError("")
      setResult(null)
    } catch {
      setError("Camera access denied or not available.")
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCamOn(false)
    busyRef.current = false
  }

  // cleanup on unmount
  useEffect(() => () => stopCamera(), [])

  const btnBase = {
    padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
    fontFamily: "var(--font-body)", cursor: "pointer", transition: "var(--transition)",
    display: "inline-flex", alignItems: "center", gap: 7, border: "none",
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* left: camera feed */}
      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px" }}>Live Capture</h3>
          <span style={{
            fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 10px", borderRadius: 100, border: "1px solid",
            ...(camOn
              ? { color: "var(--green-light)", borderColor: "rgba(106,191,114,0.4)", background: "rgba(74,150,80,0.1)", animation: "pulse-dot 2s ease-in-out infinite" }
              : { color: "var(--text3)", borderColor: "var(--border)" })
          }}>{camOn ? "ready" : "off"}</span>
        </div>

        <div style={{ padding: 24 }}>
          {/* video zone */}
          <div style={{ borderRadius: "var(--radius)", background: "var(--bg2)", overflow: "hidden", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: camOn ? "block" : "none", borderRadius: "var(--radius)" }}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {!camOn && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "var(--text3)" }}>
                <ScanLine size={40} strokeWidth={1.2} color="var(--text3)" />
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>Camera not started</p>
              </div>
            )}
            {camOn && loading && (
              <div style={{
                position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                background: "rgba(11,15,11,0.85)", backdropFilter: "blur(8px)",
                padding: "5px 14px", borderRadius: 100, border: "1px solid var(--border)",
                fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text2)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-light)", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                Analyzing...
              </div>
            )}
          </div>

          {/* controls */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {!camOn ? (
              <button onClick={startCamera} style={{ ...btnBase, background: "var(--green)", color: "#fff" }}>
                <Play size={14} /> Start Camera
              </button>
            ) : (
              <>
                <button onClick={captureAndPredict} disabled={loading} style={{ ...btnBase, background: "var(--green)", color: "#fff", opacity: loading ? 0.6 : 1 }}>
                  <Camera size={14} /> Capture & Analyse
                </button>
                <button onClick={stopCamera} style={{ ...btnBase, background: "rgba(220,60,60,0.12)", color: "#e05050", border: "1px solid rgba(220,60,60,0.25)" }}>
                  <Square size={13} /> Stop
                </button>
              </>
            )}

            <button
              onClick={() => setGradcam(g => !g)}
              style={{
                ...btnBase,
                border: gradcam ? "1px solid rgba(74,150,80,0.5)" : "1px solid var(--border2)",
                background: gradcam ? "rgba(74,150,80,0.2)" : "transparent",
                color: gradcam ? "var(--green-light)" : "var(--text2)",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: gradcam ? "var(--green-light)" : "var(--text3)", flexShrink: 0, boxShadow: gradcam ? "0 0 6px var(--green-light)" : "none", transition: "var(--transition)" }} />
              <Flame size={14} /> GradCAM — {gradcam ? "On" : "Off"}
            </button>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", borderRadius: 8, marginTop: 12, background: "rgba(220,60,60,0.1)", border: "1px solid rgba(220,60,60,0.25)", color: "#e05050", fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
              <AlertTriangle size={15} /><span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* right: live results */}
      <ResultPanel result={result} loading={loading} />
    </div>
  )
}
