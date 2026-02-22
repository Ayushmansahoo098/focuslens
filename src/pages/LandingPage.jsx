import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div
      style={{
        background: "#F2EDE4",
        minHeight: "100vh",
        color: "#1A1A1A",
      }}
    >
      <Navbar />

      <div style={{ padding: "40px" }}>
        <div style={{ padding: "80px 40px", maxWidth: "900px" }}>
  <h1
    style={{
      fontSize: "48px",
      marginBottom: "20px",
      lineHeight: "1.2",
    }}
  >
    Stay focused. Study smarter.
  </h1>

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

  <div style={{ display: "flex", gap: "16px" }}>
    <button
      style={{
        background: "#EDE8F7",
        border: "1px solid #C9BFEA",
        padding: "14px 24px",
        borderRadius: "10px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Start Free
    </button>

    <button
      style={{
        background: "transparent",
        border: "1px solid #C9BFEA",
        padding: "14px 24px",
        borderRadius: "10px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      See Demo
    </button>
  </div>
<div style={{ padding: "40px" }}>
  <h2 style={{ marginBottom: "30px" }}>Why FocusLens?</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
      }}
    >
      <h3>AI Focus Detection</h3>
      <p>
        Uses your webcam and AI to detect attention, distraction, and drowsiness
        in real time.
      </p>
    </div>

    {/* Feature 2 */}
    <div
      style={{
        background: "#EDE8F7",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #C9BFEA",
      }}
    >
      <h3>Real-time Alerts</h3>
      <p>
        Get gentle nudges and alerts when you lose focus during study sessions.
      </p>
    </div>

    {/* Feature 3 */}
    <div
      style={{
        background: "#EDE8F7",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #C9BFEA",
      }}
    >
      <h3>Smart Analytics</h3>
      <p>
        Track your productivity, focus time, and improvement with beautiful
        dashboards.
      </p>
    </div>
  </div>
</div>
</div>
      </div>
    </div>
  );
};

export default LandingPage;