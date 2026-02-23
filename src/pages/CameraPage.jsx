import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import useCamera from "../hooks/useCamera";
import useFocusSession from "../hooks/useFocusSession";

const stateConfig = {
  idle: { label: "Ready to Start", color: "#6B6B6B", bg: "#EDE8F7", dot: "#6B6B6B" },
  focused: { label: "Focused 🟢", color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  distracted: { label: "Distracted 🔴", color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
  drowsy: { label: "Drowsy 🟡", color: "#d97706", bg: "#fef9c3", dot: "#f59e0b" },
};

const CameraPage = () => {
  const navigate = useNavigate();
  const { webcamRef, cameraReady, cameraError, handleCameraReady, handleCameraError } = useCamera();
  const {
    isRunning, elapsedTime, focusState, focusScore,
    distractionCount, bestStreak, currentStreak,
    startSession, stopSession, resetSession, formatTime,
  } = useFocusSession();

  const state = stateConfig[focusState] || stateConfig.idle;

  return (
    <div style={{ background: "#F2EDE4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        padding: "16px 48px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #C9BFEA", background: "#F2EDE4"
      }}>
        <span
          onClick={() => navigate("/")}
          style={{ fontWeight: "700", fontSize: "18px", color: "#1A1A1A", cursor: "pointer" }}
        >
          FocusLens
        </span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span
            onClick={() => navigate("/dashboard")}
            style={{ fontSize: "14px", color: "#6B6B6B", cursor: "pointer", fontWeight: "500" }}
          >
            Dashboard
          </span>
          <span style={{
            background: "#EDE8F7", border: "1px solid #C9BFEA",
            borderRadius: "20px", padding: "6px 16px",
            fontSize: "13px", color: "#1A1A1A", fontWeight: "500"
          }}>
            Session {isRunning ? "Active" : "Inactive"}
          </span>
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ padding: "32px 48px" }}>

        {/* Title */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1A1A1A", margin: 0 }}>
            Focus Session
          </h1>
          <p style={{ color: "#6B6B6B", marginTop: "6px", fontSize: "14px" }}>
            Your camera monitors your focus in real time
          </p>
        </div>

        {/* Focus State Banner */}
        {isRunning && (
          <div style={{
            background: state.bg, border: `1px solid ${state.dot}`,
            borderRadius: "12px", padding: "14px 20px",
            marginBottom: "24px", display: "flex",
            alignItems: "center", gap: "10px"
          }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: state.dot, boxShadow: `0 0 8px ${state.dot}`
            }} />
            <span style={{ fontWeight: "600", color: state.color, fontSize: "15px" }}>
              {state.label}
            </span>
            <span style={{ color: "#6B6B6B", fontSize: "13px", marginLeft: "auto" }}>
              Current streak: {currentStreak} intervals
            </span>
          </div>
        )}

        {/* Main Layout */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* Camera Card */}
          <div style={{
            background: "#EDE8F7", border: "1px solid #C9BFEA",
            borderRadius: "20px", padding: "20px", flex: "1", maxWidth: "720px"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A" }}>Live Camera</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: cameraReady ? "#22c55e" : "#f59e0b",
                  boxShadow: cameraReady ? "0 0 6px #22c55e" : "0 0 6px #f59e0b"
                }} />
                <span style={{ fontSize: "13px", color: "#6B6B6B" }}>
                  {cameraReady ? "Camera Active" : "Connecting..."}
                </span>
              </div>
            </div>

            {cameraError ? (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: "12px", padding: "24px", textAlign: "center", color: "#dc2626"
              }}>
                Camera access denied. Please allow permission and refresh.
              </div>
            ) : (
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true}
                screenshotFormat="image/jpeg"
                onUserMedia={handleCameraReady}
                onUserMediaError={handleCameraError}
                style={{ width: "100%", borderRadius: "12px", display: "block" }}
              />
            )}
          </div>

          {/* Stats Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "220px" }}>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Focus Score</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "40px", fontWeight: "700", color: "#1A1A1A" }}>
                {isRunning ? `${focusScore}` : "--"}
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#A594E0" }}>
                {isRunning ? "Live updating" : "Start session to begin"}
              </p>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Session Time</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>
                {formatTime(elapsedTime)}
              </h2>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Distractions</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>
                {distractionCount}
              </h2>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: "20px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Best Streak 🔥</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>
                {bestStreak}
              </h2>
            </div>

            <button
              onClick={isRunning ? stopSession : startSession}
              style={{
                background: isRunning ? "#fee2e2" : "#A594E0",
                color: isRunning ? "#dc2626" : "#fff",
                border: isRunning ? "1px solid #fecaca" : "none",
                borderRadius: "12px", padding: "14px",
                fontSize: "15px", fontWeight: "600",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >
              {isRunning ? "Stop Session" : "Start Session"}
            </button>

            <button
              onClick={resetSession}
              style={{
                background: "#F2EDE4", color: "#1A1A1A",
                border: "1px solid #C9BFEA", borderRadius: "12px",
                padding: "14px", fontSize: "15px",
                fontWeight: "600", cursor: "pointer",
              }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >
              Reset
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;