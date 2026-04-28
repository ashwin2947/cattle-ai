import { Link, useLocation } from "react-router-dom"
import { Beef } from "lucide-react"

export default function Navbar() {
  const { pathname } = useLocation()

  const link = (to, label, badge) => (
    <Link
      to={to}
      style={{
        padding: "5px 14px", borderRadius: 7, fontSize: 13, fontWeight: 500,
        color: pathname === to ? "var(--green-light)" : "var(--text2)",
        background: pathname === to ? "rgba(74,150,80,0.12)" : "transparent",
        fontFamily: "var(--font-body)", textDecoration: "none",
        transition: "var(--transition)", border: "none", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 4,
      }}
    >
      {label}
      {badge && (
        <span style={{
          fontSize: 10, padding: "2px 6px", borderRadius: 4,
          background: "rgba(56,201,212,0.15)", color: "var(--cyan)", marginLeft: 4,
        }}>{badge}</span>
      )}
    </Link>
  )

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 52,
      background: "rgba(11,15,11,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <Link to="/" style={{
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 17,
        color: "var(--text)", textDecoration: "none", letterSpacing: "-0.3px",
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--green), var(--cyan))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Beef size={12} color="#fff" />
        </div>
        <span style={{ letterSpacing: "0.3px" }}>Cattle<span style={{ color: "var(--green-light)", marginLeft: 3 }}>AI</span></span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {link("/", "Home")}
        {link("/breed", "Breed Predict")}
        {link("/weight", "Weight Estimate")}
      </div>
    </nav>
  )
}
