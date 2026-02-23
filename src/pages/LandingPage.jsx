import { useNavigate } from "react-router-dom";

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
    <div style={{ background: "#F2EDE4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        padding: "18px 64px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #C9BFEA",
      }}>
        <span style={{ fontWeight: "800", fontSize: "20px", color: "#1A1A1A", letterSpacing: "-0.5px" }}>
          FocusLens
        </span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: "#6B6B6B", cursor: "pointer" }}>How it works</span>
          <button
            onClick={() => navigate("/camera")}
            style={{
              background: "#EDE8F7", color: "#1A1A1A",
              border: "1px solid #C9BFEA", borderRadius: "20px",
              padding: "8px 20px", fontSize: "14px",
              fontWeight: "600", cursor: "pointer",
            }}
          >
            Open App →
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
          background: "#EDE8F7", border: "1px solid #C9BFEA",
          borderRadius: "20px", padding: "6px 18px",
          fontSize: "13px", color: "#A594E0",
          fontWeight: "600", marginBottom: "28px",
          letterSpacing: "0.3px"
        }}>
          ✦ AI-Powered Focus Coach
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "64px", fontWeight: "800",
          color: "#1A1A1A", margin: "0 0 24px",
          lineHeight: "1.1", letterSpacing: "-2px",
          maxWidth: "800px"
        }}>
          Stay Focused.<br />
          <span style={{ color: "#A594E0" }}>Stay Sharp.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "18px", color: "#6B6B6B",
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
            style={{
              background: "#A594E0", color: "#fff",
              border: "none", borderRadius: "12px",
              padding: "14px 32px", fontSize: "16px",
              fontWeight: "600", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(165,148,224,0.4)",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Start Focusing →
          </button>
          <button
            style={{
              background: "#EDE8F7", color: "#1A1A1A",
              border: "1px solid #C9BFEA", borderRadius: "12px",
              padding: "14px 32px", fontSize: "16px",
              fontWeight: "600", cursor: "pointer",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: "64px", padding: "32px 64px",
        borderTop: "1px solid #C9BFEA",
        borderBottom: "1px solid #C9BFEA",
        margin: "0 64px",
        background: "#EDE8F7",
        borderRadius: "20px",
      }}>
        {[
          { value: "Real-Time", label: "AI Detection" },
          { value: "3s", label: "Update Interval" },
          { value: "100%", label: "Browser Based" },
          { value: "0%", label: "Data Sent Online" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#1A1A1A" }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: "#6B6B6B", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 64px" }}>
        <h2 style={{
          textAlign: "center", fontSize: "36px",
          fontWeight: "800", color: "#1A1A1A",
          marginBottom: "12px", letterSpacing: "-1px"
        }}>
          Everything you need to focus
        </h2>
        <p style={{
          textAlign: "center", color: "#6B6B6B",
          fontSize: "16px", marginBottom: "48px"
        }}>
          Built for students, developers, and deep workers.
        </p>

        {/* Feature Cards */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#EDE8F7", border: "1px solid #C9BFEA",
              borderRadius: "20px", padding: "32px",
              flex: "1", maxWidth: "320px",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A1A1A", margin: "0 0 10px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "1.6", margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        background: "#EDE8F7", border: "1px solid #C9BFEA",
        borderRadius: "24px", margin: "0 64px",
        padding: "64px", textAlign: "center"
      }}>
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#1A1A1A", marginBottom: "48px", letterSpacing: "-1px" }}>
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
                fontSize: "13px", fontWeight: "700", color: "#A594E0",
                marginBottom: "12px", letterSpacing: "1px"
              }}>
                {s.step}
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#1A1A1A", margin: "0 0 8px" }}>
                {s.title}
              </h4>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "1.6", margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "48px",
        color: "#6B6B6B", fontSize: "13px"
      }}>
        Built with ❤️ using React + face-api.js — FocusLens © 2026
      </div>

    </div>
  );
};

export default LandingPage;