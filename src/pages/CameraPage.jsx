import { useRef } from "react";
import Webcam from "react-webcam";

/*
  CameraPage
  ----------
  This page shows live webcam preview.
  Later we will add face detection and focus tracking here.
*/

const CameraPage = () => {
  const webcamRef = useRef(null);

  return (
    <div
      style={{
        background: "#F2EDE4",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h2>Camera Preview</h2>

      <Webcam
  ref={webcamRef}
  audio={false}
  screenshotFormat="image/jpeg"
  mirrored={false}
  style={{
    width: "100%",
    maxWidth: "700px",
    borderRadius: "12px",
    border: "2px solid #C9BFEA",
  }}
/>
    </div>
  );
};

export default CameraPage;
