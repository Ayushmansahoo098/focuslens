import { useState, useEffect } from "react";
import * as faceapi from "face-api.js/dist/face-api.min.js";

const useFaceDetection = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);

        setModelsLoaded(true);
        console.log("✅ Models loaded successfully!");
      } catch (err) {
        console.error("❌ Error loading models:", err);
      }
    };

    loadModels();
  }, []);

  return { modelsLoaded };
};

export default useFaceDetection;
