import { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js/dist/face-api.min.js";

// ─── Tuning Constants ────────────────────────────────────────────────────────
const DETECTION_INTERVAL_MS = 1000;       // How often we run face detection
const MIN_DETECTION_CONFIDENCE = 0.6;     // Face must score above this to count as "present"
const EAR_DROWSY_THRESHOLD = 0.22;        // Eye Aspect Ratio below this → drowsy
const AWAY_SCORE_PENALTY = 8;             // Score lost per tick while away
const DISTRACTED_SCORE_PENALTY = 10;      // Score lost per distraction tick
const FOCUSED_SCORE_BONUS = 2;            // Score gained per focused tick
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculates Eye Aspect Ratio (EAR) from 6 eye landmark points.
 * EAR < EAR_DROWSY_THRESHOLD indicates eyes are closing (drowsy).
 */
const calcEAR = (eyePoints) => {
  // Vertical distances
  const v1 = Math.hypot(eyePoints[1].x - eyePoints[5].x, eyePoints[1].y - eyePoints[5].y);
  const v2 = Math.hypot(eyePoints[2].x - eyePoints[4].x, eyePoints[2].y - eyePoints[4].y);
  // Horizontal distance
  const h = Math.hypot(eyePoints[0].x - eyePoints[3].x, eyePoints[0].y - eyePoints[3].y);
  return (v1 + v2) / (2.0 * h);
};

/**
 * Extracts left and right eye landmark points from a 68-point landmark set.
 */
const getEyePoints = (landmarks) => {
  const pts = landmarks.positions;
  return {
    left: pts.slice(36, 42),   // left eye: points 36–41
    right: pts.slice(42, 48),  // right eye: points 42–47
  };
};

// ─────────────────────────────────────────────────────────────────────────────

const useFocusSession = (videoRef) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // focusState: "idle" | "focused" | "distracted" | "drowsy" | "away"
  const [focusState, setFocusState] = useState("idle");
  const [focusScore, setFocusScore] = useState(100);
  const [distractionCount, setDistractionCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const timerRef = useRef(null);
  const detectionRef = useRef(null);
  const streakRef = useRef(0);

  // ── 1. Load face-api models once on mount ──────────────────────────────────
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        console.log("✅ face-api models loaded");
      } catch (err) {
        console.error("❌ Failed to load face-api models:", err);
      }
    };
    loadModels();
  }, []);

  // ── 2. Session timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // ── 3. Real face-api detection loop ───────────────────────────────────────
  useEffect(() => {
    if (!isRunning || !modelsLoaded) return;

    const detectorOptions = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224,
      scoreThreshold: MIN_DETECTION_CONFIDENCE,
    });

    detectionRef.current = setInterval(async () => {
      const video = videoRef?.current?.video ?? videoRef?.current;

      // Guard: video must be ready
      if (!video || video.readyState < 2 || video.paused) return;

      try {
        // Run detection with landmarks
        const detection = await faceapi
          .detectSingleFace(video, detectorOptions)
          .withFaceLandmarks(true); // true = use tiny landmark net

        // ── GATE: No face detected → "away" ──────────────────────────────
        if (!detection) {
          setFocusState("away");
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - AWAY_SCORE_PENALTY));
          return;
        }

        // ── GATE: Confidence check ────────────────────────────────────────
        if (detection.detection.score < MIN_DETECTION_CONFIDENCE) {
          setFocusState("away");
          streakRef.current = 0;
          setCurrentStreak(0);
          setFocusScore((prev) => Math.max(0, prev - AWAY_SCORE_PENALTY));
          return;
        }

        // ── Drowsiness check via Eye Aspect Ratio ─────────────────────────
        const { left, right } = getEyePoints(detection.landmarks);
        const ear = (calcEAR(left) + calcEAR(right)) / 2;
        const isDrowsy = ear < EAR_DROWSY_THRESHOLD;

        if (isDrowsy) {
          setFocusState("drowsy");
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - DISTRACTED_SCORE_PENALTY));
          return;
        }

        // ── All checks passed → focused ───────────────────────────────────
        setFocusState("focused");
        streakRef.current += 1;
        setCurrentStreak(streakRef.current);
        setBestStreak((prev) => Math.max(prev, streakRef.current));
        setFocusScore((prev) => Math.min(100, prev + FOCUSED_SCORE_BONUS));

      } catch (err) {
        console.error("Detection error:", err);
      }
    }, DETECTION_INTERVAL_MS);

    return () => clearInterval(detectionRef.current);
  }, [isRunning, modelsLoaded, videoRef]);

  // ── Session controls ───────────────────────────────────────────────────────
  const startSession = useCallback(() => {
    setIsRunning(true);
    setFocusState("focused");
    setElapsedTime(0);
    setFocusScore(100);
    setDistractionCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    streakRef.current = 0;
  }, []);

  const stopSession = useCallback(() => {
    setIsRunning(false);
    setFocusState("idle");
  }, []);

  const resetSession = useCallback(() => {
    setIsRunning(false);
    setFocusState("idle");
    setElapsedTime(0);
    setFocusScore(100);
    setDistractionCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    streakRef.current = 0;
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    isRunning,
    elapsedTime,
    focusState,       // now includes "away" state
    focusScore,
    distractionCount,
    bestStreak,
    currentStreak,
    modelsLoaded,
    startSession,
    stopSession,
    resetSession,
    formatTime,
  };
};

export default useFocusSession;
