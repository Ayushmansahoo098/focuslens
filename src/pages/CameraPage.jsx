import React from "react";
import Webcam from "react-webcam";
import useCamera from "../hooks/useCamera";

const CameraPage = () => {
  const {
    webcamRef,
    cameraReady,
    cameraError,
    handleCameraReady,
    handleCameraError,
  } = useCamera();

  return (
    <div
      style={{
        background: "#F2EDE4",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h2>FocusLens Camera</h2>

      {!cameraReady && !cameraError && (
        <p>Initializing camera...</p>
      )}

      {cameraError && (
        <p style={{ color: "red" }}>
          Camera access denied. Please allow permission and refresh.
        </p>
      )}

      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={false}
        screenshotFormat="image/jpeg"
        onUserMedia={handleCameraReady}
        onUserMediaError={handleCameraError}
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