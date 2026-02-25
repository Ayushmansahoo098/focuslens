import { useNavigate } from "react-router-dom";
import WaveLabel from "../components/WaveLabel";

const palette = {
  bg: "#ECEBDB",
  card: "#F3F2E6",
  stroke: "#C9CCB8",
  text: "#1A1A1A",
  muted: "#6F726D",
  teal: "#055C52",
  lilac: "#D8C2E8",
};

const features = [
  {
    icon: "🎯",
    title: "Real-Time Focus Tracking",
    desc: "Your camera detects whether you're focused, distracted, or drowsy — every 3 seconds.",
  },
  {
    icon: "📊",
    title: "Live Focus Score",
    desc: "Get a live score based on your attention. Watch it rise as you stay on task.",
  },
  {
    icon: "🔥",
    title: "Streak & Session Stats",
    desc: "Track your best focus streak, total distractions, and session time in real time.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: palette.bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        padding: "18px 64px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${palette.stroke}`,
      }}>
        <span style={{ fontWeight: "800", fontSize: "20px", color: palette.text, letterSpacing: "-0.5px" }}>
          FocusLens
        </span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: palette.muted, cursor: "pointer" }}>How it works</span>
          <button
            onClick={() => navigate("/camera")}
            className="wave-btn"
            style={{
              background: palette.lilac, color: palette.text,
              border: `1px solid ${palette.text}`, borderRadius: "20px",
              padding: "8px 20px", fontSize: "14px",
              fontWeight: "600", cursor: "pointer",
            }}
          >
            <WaveLabel text="Open App →" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        padding: "100px 64px 60px",
      }}>
        {/* Badge */}
        <div style={{
          background: palette.card, border: `1px solid ${palette.stroke}`,
          borderRadius: "20px", padding: "6px 18px",
          fontSize: "13px", color: palette.teal,
          fontWeight: "600", marginBottom: "28px",
          letterSpacing: "0.3px"
        }}>
          ✦ AI-Powered Focus Coach
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "64px", fontWeight: "800",
          color: palette.text, margin: "0 0 24px",
          lineHeight: "1.1", letterSpacing: "-2px",
          maxWidth: "800px"
        }}>
          Stay Focused.<br />
          <span style={{ color: palette.teal }}>Stay Sharp.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "18px", color: palette.muted,
          maxWidth: "520px", lineHeight: "1.7",
          margin: "0 0 40px"
        }}>
          FocusLens uses your webcam and AI to track your attention in real time —
          so you can study smarter, not longer.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/camera")}
            className="wave-btn"
            style={{
              background: palette.lilac, color: palette.text,
              border: `1px solid ${palette.text}`, borderRadius: "12px",
              padding: "14px 32px", fontSize: "16px",
              fontWeight: "600", cursor: "pointer",
              boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            <WaveLabel text="Start Focusing →" />
          </button>
          <button
            className="wave-btn"
            style={{
              background: palette.card, color: palette.text,
              border: `1px solid ${palette.stroke}`, borderRadius: "12px",
              padding: "14px 32px", fontSize: "16px",
              fontWeight: "600", cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            <WaveLabel text="See How It Works" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: "64px", padding: "32px 64px",
        borderTop: `1px solid ${palette.stroke}`,
        borderBottom: `1px solid ${palette.stroke}`,
        margin: "0 64px",
        background: palette.card,
        borderRadius: "20px",
      }}>
        {[
          { value: "Real-Time", label: "AI Detection" },
          { value: "3s", label: "Update Interval" },
          { value: "100%", label: "Browser Based" },
          { value: "0%", label: "Data Sent Online" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: palette.text }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: palette.muted, marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 64px" }}>
        <h2 style={{
          textAlign: "center", fontSize: "36px",
          fontWeight: "800", color: palette.text,
          marginBottom: "12px", letterSpacing: "-1px"
        }}>
          Everything you need to focus
        </h2>
        <p style={{
          textAlign: "center", color: palette.muted,
          fontSize: "16px", marginBottom: "48px"
        }}>
          Built for students, developers, and deep workers.
        </p>

        {/* Feature Cards */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: palette.card, border: `1px solid ${palette.stroke}`,
              borderRadius: "20px", padding: "32px",
              flex: "1", maxWidth: "320px",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: palette.text, margin: "0 0 10px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", color: palette.muted, lineHeight: "1.6", margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        background: palette.card, border: `1px solid ${palette.stroke}`,
        borderRadius: "24px", margin: "0 64px",
        padding: "64px", textAlign: "center"
      }}>
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: palette.text, marginBottom: "48px", letterSpacing: "-1px" }}>
          How it works
        </h2>
        <div style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
          {[
            { step: "01", title: "Open the app", desc: "Click Start Session and allow camera access" },
            { step: "02", title: "AI watches you", desc: "Face detection runs every 3 seconds in your browser" },
            { step: "03", title: "Stay on track", desc: "Get instant alerts and track your focus score live" },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1", maxWidth: "240px" }}>
              <div style={{
                fontSize: "13px", fontWeight: "700", color: palette.teal,
                marginBottom: "12px", letterSpacing: "1px"
              }}>
                {s.step}
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: palette.text, margin: "0 0 8px" }}>
                {s.title}
              </h4>
              <p style={{ fontSize: "14px", color: palette.muted, lineHeight: "1.6", margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "48px",
        color: palette.muted, fontSize: "13px"
      }}>
        <div className="footer-main" style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: palette.text, cursor: "default" }}>
          © 2026 All Rights Reserved.
        </div>
        <div className="footer-sub" style={{ fontSize: "14px", color: palette.muted, cursor: "default" }}>
          made with <span className="footer-heart" style={{ color: "#FF4B4B" }}>♥</span> by Ayushman
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
