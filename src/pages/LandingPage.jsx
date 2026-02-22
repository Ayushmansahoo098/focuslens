// Import Navbar component
import Navbar from "../components/Navbar";

// Main Landing Page component
const LandingPage = () => {
  return (
    <div
      style={{
        // Warm cream background as per FocusLens design
        background: "#F2EDE4",
        minHeight: "100vh",
        color: "#1A1A1A",
      }}
    >
      {/* Top navigation bar */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <div
        style={{
          // Centered layout with responsive padding
          padding: "80px 20px",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        {/* Main product headline */}
        <h1
          style={{
            // Responsive font size using clamp
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: "1.2",
            marginBottom: "20px",
          }}
        >
          Stay focused. Study smarter.
        </h1>

        {/* Product description */}
        <p
          style={{
            fontSize: "18px",
            marginBottom: "30px",
            color: "#444",
          }}
        >
          FocusLens uses AI and your webcam to detect distraction, drowsiness,
          and attention in real time — helping you build deep work habits.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap", // Makes buttons responsive on small screens
          }}
        >
          {/* Primary button */}
          <button
            style={{
              background: "#EDE8F7",
              border: "1px solid #C9BFEA",
              padding: "14px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease", // Smooth hover effect
            }}
          >
            Start Free
          </button>

          {/* Secondary button */}
          <button
            style={{
              background: "transparent",
              border: "1px solid #C9BFEA",
              padding: "14px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            See Demo
          </button>
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {/* Section heading */}
        <h2 style={{ marginBottom: "30px" }}>Why FocusLens?</h2>

        {/* Responsive grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              background: "#EDE8F7",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #C9BFEA",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <h3>AI Focus Detection</h3>
            <p>
              Uses your webcam and AI to detect attention, distraction,
              and drowsiness in real time.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              background: "#EDE8F7",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #C9BFEA",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <h3>Real-time Alerts</h3>
            <p>
              Get gentle nudges and alerts when you lose focus during
              study sessions.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              background: "#EDE8F7",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #C9BFEA",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <h3>Smart Analytics</h3>
            <p>
              Track your productivity, focus time, and improvement with
              beautiful dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;