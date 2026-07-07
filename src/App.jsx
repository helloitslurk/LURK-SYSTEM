import { useState } from "react";

const NAV_CARDS = [
  { label: "Online", icon: "📦", value: null, accent: ["#FF6B35", "#FF9A5C"] },
  { label: "Raporlar", icon: "📊", value: null, accent: ["#3A9EFF", "#6BC5FF"] },
  { label: "Rozetler", icon: "🎖", value: "5/26", accent: ["#FF9500", "#FFB340"] },
  { label: "Yapılacaklar", icon: "✅", value: null, accent: ["#A855F7", "#C084FC"] },
  { label: "Ürün Analizi", icon: "📦", value: null, accent: ["#06C167", "#34D399"] },
  { label: "Müşteriler", icon: "👥", value: "12", accent: ["#F59E0B", "#FCD34D"] },
];

const STATS = [
  { label: "Bu Hafta", value: "12.450", unit: "TL", pct: 72, color: "#34C759", bg: "rgba(52,199,89,0.12)" },
  { label: "Adisyon", value: "47", unit: "adet", pct: 58, color: "#3A9EFF", bg: "rgba(58,158,255,0.12)" },
  { label: "Harcama", value: "3.200", unit: "TL", pct: 40, color: "#FF3B30", bg: "rgba(255,59,48,0.12)" },
  { label: "Net", value: "9.250", unit: "TL", pct: 85, color: "#A855F7", bg: "rgba(168,85,247,0.12)" },
];

export default function Preview() {
  const [active, setActive] = useState(null);

  return (
    <div style={{
      background: "#080810",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "-5%", left: "-10%", width: "50vw", height: "50vw", maxWidth: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(52,199,89,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "35%", right: "-8%", width: "40vw", height: "40vw", maxWidth: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,122,255,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "5%", left: "20%", width: "45vw", height: "45vw", maxWidth: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{
        background: "rgba(8,8,16,0.8)",
        backdropFilter: "blur(40px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "0 20px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>☰</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>LURK.</span>
          <span style={{ background: "rgba(52,199,89,0.15)", color: "#34C759", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>● 10:19</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔔</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔒</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>☀️</div>
        </div>
      </nav>

      <div style={{ padding: "24px 20px 80px", maxWidth: 480, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 2 }}>Çarşamba</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.5, margin: "0 0 10px", lineHeight: 1.1 }}>LURK.</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: "rgba(52,199,89,0.15)", color: "#34C759", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>● Açık — 10:19</span>
            <button style={{ background: "rgba(255,149,0,0.12)", border: "1px solid rgba(255,149,0,0.25)", color: "#FF9500", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, cursor: "pointer" }}>Günü Kapat</button>
          </div>
        </div>

        {/* Nav Cards - colorful gradient */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
          {NAV_CARDS.map((card, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i
                ? `linear-gradient(135deg, ${card.accent[0]}, ${card.accent[1]})`
                : "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: active === i ? "none" : `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 18,
              padding: "16px 12px",
              cursor: "pointer",
              textAlign: "left",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.2s",
              boxShadow: active === i ? `0 8px 24px ${card.accent[0]}44` : "0 4px 16px rgba(0,0,0,0.3)",
            }}>
              {active !== i && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${card.accent[0]}, transparent)`,
                  borderRadius: "18px 18px 0 0",
                }} />
              )}
              <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: active === i ? 1 : 0.8 }}>{card.label}</div>
              {card.value && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: active === i ? "rgba(255,255,255,0.25)" : card.accent[0] + "33",
                  color: active === i ? "#fff" : card.accent[0],
                  fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 10
                }}>{card.value}</div>
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "#444", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Hedef & Özet</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                background: s.bg,
                border: `1px solid ${s.color}22`,
                borderRadius: 16,
                padding: "16px 16px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.6 }} />
                <div style={{ fontSize: 10, color: s.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, color: "#fff" }}>
                  {s.value}
                  <span style={{ fontSize: 11, color: s.color, fontWeight: 600, marginLeft: 4 }}>{s.unit}</span>
                </div>
                <div style={{ marginTop: 10, background: "rgba(255,255,255,0.08)", borderRadius: 4, height: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: s.pct + "%", background: s.color, borderRadius: 4, transition: "width 1s ease" }} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>%{s.pct}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
