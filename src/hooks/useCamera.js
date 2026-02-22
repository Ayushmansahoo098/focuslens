import { useRef, useState } from "react";

/*
  useCamera Hook
  --------------
  Handles:
  - Webcam reference
  - Permission states
  - Error states
  - Ready for AI detection
*/

const useCamera = () => {
  const webcamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleCameraError = () => {
    setCameraError(true);
  };

  return {
    webcamRef,
    cameraReady,
    cameraError,
    handleCameraReady,
    handleCameraError,
  };
};

export default useCamera;