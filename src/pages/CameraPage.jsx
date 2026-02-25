import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import useCamera from "../hooks/useCamera";
import useFocusSession from "../hooks/useFocusSession";

const stateConfig = {
  idle: { label: "Ready to Start", color: "#6B6B6B", bg: "#EDE8F7", dot: "#6B6B6B" },
  focused: { label: "Focused 🟢", color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  warning: { label: "Slightly Off 🟠", color: "#c2410c", bg: "#fff7ed", dot: "#fb923c" },
  low_light: { label: "Low Light 🌙", color: "#7c2d12", bg: "#ffedd5", dot: "#fb923c" },
  distracted: { label: "Distracted 🔴", color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
  drowsy: { label: "Drowsy 🟡", color: "#d97706", bg: "#fef9c3", dot: "#f59e0b" },
  away: { label: "Not in Frame 👤", color: "#c2410c", bg: "#fff7ed", dot: "#f97316" },
};

const CameraPage = () => {
  const navigate = useNavigate();
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = viewportWidth <= 768;
  const isTablet = viewportWidth > 768 && viewportWidth <= 1024;
  const isDesktop = viewportWidth > 1024;

  const navPadding = isMobile ? "12px 16px" : isTablet ? "14px 24px" : "16px 48px";
  const pagePadding = isMobile ? "16px" : isTablet ? "20px 24px" : "32px 48px";
  const titleSize = isMobile ? "22px" : isTablet ? "24px" : "26px";
  const layoutDirection = isDesktop ? "row" : "column";
  const cameraMaxWidth = isDesktop ? "720px" : "100%";
  const statsMinWidth = isDesktop ? "300px" : "100%";
  const heroGap = isMobile ? "14px" : "20px";
  const cardPadding = isMobile ? "14px" : isTablet ? "16px" : "20px";
  const scoreFont = isMobile ? "34px" : isTablet ? "36px" : "40px";
  const cameraMinHeight = isMobile ? "280px" : isTablet ? "360px" : "auto";

  const { webcamRef, cameraReady, cameraError, handleCameraReady, handleCameraError } = useCamera();
  const {
    isRunning,
    elapsedTime,
    focusState,
    focusScore,
    distractionCount,
    bestStreak,
    currentStreak,
    startSession,
    stopSession,
    resetSession,
    formatTime,
  } = useFocusSession(webcamRef);

  const state = stateConfig[focusState] || stateConfig.idle;

  return (
    <div style={{ background: "#F2EDE4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <nav
        style={{
          padding: navPadding,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #C9BFEA",
          background: "#F2EDE4",
          gap: "12px",
        }}
      >
        <span onClick={() => navigate("/")} style={{ fontWeight: "700", fontSize: "18px", color: "#1A1A1A", cursor: "pointer" }}>
          FocusLens
        </span>
        <div style={{ display: "flex", gap: isMobile ? "10px" : "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span onClick={() => navigate("/dashboard")} style={{ fontSize: isMobile ? "13px" : "14px", color: "#6B6B6B", cursor: "pointer", fontWeight: "500" }}>
            Dashboard
          </span>
          <span
            style={{
              background: "#EDE8F7",
              border: "1px solid #C9BFEA",
              borderRadius: "20px",
              padding: "6px 14px",
              fontSize: isMobile ? "12px" : "13px",
              color: "#1A1A1A",
              fontWeight: "500",
            }}
          >
            Session {isRunning ? "Active" : "Inactive"}
          </span>
        </div>
      </nav>

      <div style={{ padding: pagePadding }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: titleSize, fontWeight: "700", color: "#1A1A1A", margin: 0 }}>Focus Session</h1>
          <p style={{ color: "#6B6B6B", marginTop: "6px", fontSize: isMobile ? "13px" : "14px" }}>
            Focus uses head-angle tolerance + time buffer (brief head turns are ignored)
          </p>
        </div>

        {isRunning && (
          <div
            style={{
              background: state.bg,
              border: `1px solid ${state.dot}`,
              borderRadius: "12px",
              padding: isMobile ? "12px" : "14px 20px",
              marginBottom: "20px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: "10px",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: state.dot, boxShadow: `0 0 8px ${state.dot}` }} />
            <span style={{ fontWeight: "600", color: state.color, fontSize: "15px" }}>{state.label}</span>

            {focusState === "away" ? (
              <span style={{ color: "#c2410c", fontSize: "13px", marginLeft: isMobile ? 0 : "auto", fontWeight: "500" }}>
                Return to your desk to resume scoring
              </span>
            ) : focusState === "low_light" ? (
              <span style={{ color: "#9a3412", fontSize: "13px", marginLeft: isMobile ? 0 : "auto", fontWeight: "500" }}>
                Too dark for reliable tracking. Add front light to continue scoring.
              </span>
            ) : focusState === "warning" ? (
              <span style={{ color: "#c2410c", fontSize: "13px", marginLeft: isMobile ? 0 : "auto", fontWeight: "500" }}>
                Head turned too far. Keep screen near eye-line to stay focused.
              </span>
            ) : (
              <span style={{ color: "#6B6B6B", fontSize: "13px", marginLeft: isMobile ? 0 : "auto" }}>
                Current streak: {currentStreak} intervals
              </span>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: layoutDirection, gap: heroGap, alignItems: "flex-start" }}>
          <div
            style={{
              background: "#EDE8F7",
              border: "1px solid #C9BFEA",
              borderRadius: "20px",
              padding: cardPadding,
              flex: "1",
              maxWidth: cameraMaxWidth,
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A" }}>Live Camera</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: cameraReady ? "#22c55e" : "#f59e0b",
                    boxShadow: cameraReady ? "0 0 6px #22c55e" : "0 0 6px #f59e0b",
                  }}
                />
                <span style={{ fontSize: "13px", color: "#6B6B6B" }}>{cameraReady ? "Camera Active" : "Connecting..."}</span>
              </div>
            </div>

            {cameraError ? (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "12px",
                  padding: "24px",
                  textAlign: "center",
                  color: "#dc2626",
                }}
              >
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
                style={{ width: "100%", borderRadius: "12px", display: "block", minHeight: cameraMinHeight, objectFit: "cover" }}
              />
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: statsMinWidth, width: "100%", maxWidth: isDesktop ? "360px" : "none" }}>
            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: isDesktop ? "20px" : "18px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Focus Score</p>
              <h2 style={{ margin: "8px 0 0", fontSize: scoreFont, fontWeight: "700", color: "#1A1A1A" }}>{isRunning ? `${focusScore}` : "--"}</h2>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#A594E0" }}>{isRunning ? "Live updating" : "Start session to begin"}</p>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: isDesktop ? "20px" : "18px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Session Time</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>{formatTime(elapsedTime)}</h2>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: isDesktop ? "20px" : "18px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Distractions</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>{distractionCount}</h2>
            </div>

            <div style={{ background: "#EDE8F7", border: "1px solid #C9BFEA", borderRadius: "16px", padding: isDesktop ? "20px" : "18px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>Best Streak 🔥</p>
              <h2 style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: "700", color: "#1A1A1A" }}>{bestStreak}</h2>
            </div>

            <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: "16px", padding: "14px" }}>
              <p style={{ margin: 0, fontSize: "12px", color: "#9a3412", fontWeight: "600" }}>Camera Setup Tips</p>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#7c2d12", lineHeight: "1.45" }}>
                Keep camera at eye level, center your face, and use front lighting for stable detection.
              </p>
            </div>

            <button
              onClick={isRunning ? stopSession : startSession}
              style={{
                background: isRunning ? "#fee2e2" : "#A594E0",
                color: isRunning ? "#dc2626" : "#fff",
                border: isRunning ? "1px solid #fecaca" : "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
            >
              {isRunning ? "Stop Session" : "Start Session"}
            </button>

            <button
              onClick={resetSession}
              style={{
                background: "#F2EDE4",
                color: "#1A1A1A",
                border: "1px solid #C9BFEA",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
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
