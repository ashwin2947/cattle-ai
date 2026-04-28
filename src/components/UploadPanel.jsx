import { useState, useRef } from "react"
import { ImageUp, Brain, Trash2, AlertTriangle } from "lucide-react"

const MAX_SIZE = 800
const VALID_TYPES = ["image/jpeg", "image/png"]

function resizeImage(file) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width <= MAX_SIZE && height <= MAX_SIZE) { resolve(file); return }
      if (width > height) { height = Math.round(height * MAX_SIZE / width); width = MAX_SIZE }
      else { width = Math.round(width * MAX_SIZE / height); height = MAX_SIZE }
      const canvas = document.createElement("canvas")
      canvas.width = width; canvas.height = height
      canvas.getContext("2d").drawImage(img, 0, 0, width, height)
      canvas.toBlob(blob => resolve(new File([blob], file.name, { type: "image/jpeg" })), "image/jpeg", 0.9)
    }
    img.src = url
  })
}

function DropZone({ label, required, file, preview, onFile, onClear, dragover, onDragOver, onDragLeave, onDrop }) {
  const inputRef = useRef()
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        {label}
        {required
          ? <span style={{ color: "var(--green-light)", fontSize: 10 }}>required</span>
          : <span style={{ color: "var(--text3)", fontSize: 10 }}>optional</span>}
      </div>
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragover ? "var(--cyan)" : "var(--border2)"}`,
            borderRadius: "var(--radius)", padding: "28px 16px", textAlign: "center",
            cursor: "pointer", transition: "var(--transition)",
            background: dragover ? "rgba(56,201,212,0.05)" : "transparent",
          }}
        >
          <input ref={inputRef} type="file" accept="image/jpeg,image/png" style={{ display: "none" }}
            onChange={e => { const f = e.target.files[0]; if (f) onFile(f) }} />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <ImageUp size={28} color="var(--text3)" strokeWidth={1.5} />
          </div>
          <p style={{ color: "var(--text2)", fontSize: 13, fontWeight: 300 }}>Drop image or click to browse</p>
          <small style={{ color: "var(--text3)", fontSize: 11, fontFamily: "var(--font-mono)" }}>JPG, JPEG, PNG</small>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <img src={preview} alt={label} style={{ width: "100%", borderRadius: "var(--radius)", objectFit: "contain", maxHeight: 160, background: "var(--bg2)", display: "block" }} />
          <button onClick={onClear} style={{
            position: "absolute", top: 8, right: 8,
            padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500,
            background: "rgba(220,60,60,0.15)", color: "#e05050", border: "1px solid rgba(220,60,60,0.3)",
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4,
            fontFamily: "var(--font-body)",
          }}>
            <Trash2 size={11} /> Remove
          </button>
          <p style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", marginTop: 4 }}>
            {(file.size / 1024).toFixed(0)} KB · max {MAX_SIZE}px
          </p>
        </div>
      )}
    </div>
  )
}

export default function UploadPanel({ onResult, onLoading, singleImage = false }) {
  const [sideFile, setSideFile]       = useState(null)
  const [sidePreview, setSidePreview] = useState(null)
  const [rearFile, setRearFile]       = useState(null)
  const [rearPreview, setRearPreview] = useState(null)
  const [dragoverSide, setDragoverSide] = useState(false)
  const [dragoverRear, setDragoverRear] = useState(false)
  const [error, setError]   = useState("")
  const [status, setStatus] = useState("idle")

  const loadFile = async (f, setSide) => {
    if (!VALID_TYPES.includes(f.type)) return
    const resized = await resizeImage(f)
    if (setSide) {
      setSideFile(resized); setSidePreview(URL.createObjectURL(resized))
    } else {
      setRearFile(resized); setRearPreview(URL.createObjectURL(resized))
    }
    setStatus("ready")
    setError("")
  }

  const clearSide = () => { setSideFile(null); setSidePreview(null); if (!rearFile) setStatus("idle") }
  const clearRear = () => { setRearFile(null); setRearPreview(null) }

  const clear = () => {
    clearSide(); clearRear(); setStatus("idle"); setError(""); onResult(null)
  }

  const runPrediction = async () => {
    if (!sideFile || (!singleImage && !rearFile)) return
    setStatus("processing")
    onLoading(true)
    setError("")
    const form = new FormData()
    if (singleImage) {
      form.append("file", sideFile)
    } else {
      form.append("side", sideFile)
      form.append("rear", rearFile)
    }
    const endpoint = singleImage ? "http://localhost:8001/predict_breed" : "http://localhost:8001/predict_weight"
    try {
      const res = await fetch(endpoint, { method: "POST", body: form })
      if (!res.ok) throw new Error()
      onResult(await res.json())
    } catch {
      setError(`Unable to reach the server. Please ensure the backend is running on localhost:8001.`)
    } finally {
      onLoading(false)
      setStatus("done")
    }
  }

  const statusStyle = {
    idle:       { color: "var(--text3)", borderColor: "var(--border)" },
    ready:      { color: "var(--cyan)", borderColor: "rgba(56,201,212,0.4)", background: "rgba(56,201,212,0.08)" },
    processing: { color: "var(--green-light)", borderColor: "rgba(106,191,114,0.4)", background: "rgba(74,150,80,0.1)", animation: "pulse-dot 2s ease-in-out infinite" },
    done:       { color: "var(--cyan)", borderColor: "rgba(56,201,212,0.4)", background: "rgba(56,201,212,0.08)" },
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--surface)", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px" }}>Image Input</h3>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 10px", borderRadius: 100, border: "1px solid", ...statusStyle[status] }}>
          {status}
        </span>
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* side image */}
        <DropZone
          label="Side View"
          required
          file={sideFile}
          preview={sidePreview}
          onFile={f => loadFile(f, true)}
          onClear={clearSide}
          dragover={dragoverSide}
          onDragOver={e => { e.preventDefault(); setDragoverSide(true) }}
          onDragLeave={() => setDragoverSide(false)}
          onDrop={e => { e.preventDefault(); setDragoverSide(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f, true) }}
        />

        {!singleImage && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />
            <DropZone
              label="Rear View"
              required
              file={rearFile}
              preview={rearPreview}
              onFile={f => loadFile(f, false)}
              onClear={clearRear}
              dragover={dragoverRear}
              onDragOver={e => { e.preventDefault(); setDragoverRear(true) }}
              onDragLeave={() => setDragoverRear(false)}
              onDrop={e => { e.preventDefault(); setDragoverRear(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f, false) }}
            />
          </>
        )}

        {/* actions */}
        {(singleImage ? sideFile : sideFile && rearFile) && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={runPrediction} style={{
              padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              background: "var(--green)", color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "var(--font-body)", transition: "var(--transition)",
              display: "inline-flex", alignItems: "center", gap: 7,
            }}><Brain size={15} /> Run Prediction</button>
            <button onClick={clear} style={{
              padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              background: "transparent", color: "var(--text2)", border: "1px solid var(--border2)",
              cursor: "pointer", fontFamily: "var(--font-body)", transition: "var(--transition)",
              display: "inline-flex", alignItems: "center", gap: 7,
            }}><Trash2 size={14} /> Clear All</button>
          </div>
        )}

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(220,60,60,0.1)", border: "1px solid rgba(220,60,60,0.25)", color: "#e05050", fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
            <AlertTriangle size={15} /><span>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
