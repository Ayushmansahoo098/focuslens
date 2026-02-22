import { useRef, useState } from "react";
import Webcam from "react-webcam";

/*
  CameraPage
  ----------
  Handles:
  - Loading state
  - Camera permission
  - Error handling
  - Ready for AI integration
*/

const CameraPage = () => {
  const webcamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  return (
    <div
      style={{
        background: "#F2EDE4",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h2>FocusLens Camera</h2>

      {/* Loading state */}
      {!cameraReady && !cameraError && (
        <p>Initializing camera...</p>
      )}

      {/* Error state */}
      {cameraError && (
        <p style={{ color: "red" }}>
          Camera access denied. Please allow permission and refresh.
        </p>
      )}

      {/* Webcam */}
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={false}
        screenshotFormat="image/jpeg"
        onUserMedia={() => setCameraReady(true)}
        onUserMediaError={() => setCameraError(true)}
        mirror={false}
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "12px",
          border: "2px solid #C9BFEA",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default CameraPage;