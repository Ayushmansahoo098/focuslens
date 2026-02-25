import { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js/dist/face-api.min.js";

// ─── Tuning Constants ────────────────────────────────────────────────────────
const DETECTION_INTERVAL_MS = 1000;
const MIN_DETECTION_CONFIDENCE = 0.6;
const EAR_DROWSY_THRESHOLD = 0.22;
const AWAY_SCORE_PENALTY = 8;
const DISTRACTED_SCORE_PENALTY = 10;
const WARNING_SCORE_PENALTY = 3;
const FOCUSED_SCORE_BONUS = 2;
const ANGLE_SMOOTHING_WINDOW = 5;
const CALIBRATION_FRAMES = 8;
const DISTRACTION_HOLD_FRAMES = 5;
const WARNING_HOLD_FRAMES = 2;
const AWAY_HOLD_FRAMES = 3;
const LOW_LIGHT_HOLD_FRAMES = 3;
const LOW_LIGHT_LUMA_THRESHOLD = 30;
const YAW_FOCUSED_MAX_DEG = 20;
const YAW_WARNING_MAX_DEG = 25;
const PITCH_FOCUSED_MAX_DEG = 15;
const PITCH_WARNING_MAX_DEG = 22;
const ROLL_FOCUSED_MAX_DEG = 18;
const ROLL_WARNING_MAX_DEG = 25;
const GAZE_X_FOCUSED_MAX = 0.12;
const GAZE_X_WARNING_MAX = 0.22;
const GAZE_Y_FOCUSED_MAX = 0.10;
const GAZE_Y_WARNING_MAX = 0.18;
// ─────────────────────────────────────────────────────────────────────────────

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

const smoothPush = (buffer, value, size) => {
  buffer.push(value);
  if (buffer.length > size) buffer.shift();
  return avg(buffer);
};

const safeRatio = (value, a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const range = Math.max(1e-6, max - min);
  return (value - min) / range;
};

const avgPoint = (landmarks, indices) => {
  const points = indices.map((idx) => landmarks[idx]).filter(Boolean);
  if (!points.length) return null;
  return {
    x: avg(points.map((p) => p.x)),
    y: avg(points.map((p) => p.y)),
  };
};

const estimateFrameLuma = (video, canvasRef) => {
  const canvas = canvasRef.current || document.createElement("canvas");
  canvasRef.current = canvas;

  const width = 64;
  const height = 48;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return 255;

  ctx.drawImage(video, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  let sum = 0;
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return sum / (data.length / 16);
};

const calcEAR = (eyePoints) => {
  const v1 = Math.hypot(eyePoints[1].x - eyePoints[5].x, eyePoints[1].y - eyePoints[5].y);
  const v2 = Math.hypot(eyePoints[2].x - eyePoints[4].x, eyePoints[2].y - eyePoints[4].y);
  const h = Math.hypot(eyePoints[0].x - eyePoints[3].x, eyePoints[0].y - eyePoints[3].y);
  return (v1 + v2) / (2.0 * h);
};

const getEyePoints = (landmarks) => {
  const pts = landmarks.positions;
  return {
    left: pts.slice(36, 42),
    right: pts.slice(42, 48),
  };
};

const estimateHeadPose = (landmarks) => {
  const pts = landmarks.positions;
  const leftEyeOuter = pts[36];
  const rightEyeOuter = pts[45];
  const noseTip = pts[30];
  const chin = pts[8];
  const leftJaw = pts[0];
  const rightJaw = pts[16];

  const eyeCenter = {
    x: (leftEyeOuter.x + rightEyeOuter.x) / 2,
    y: (leftEyeOuter.y + rightEyeOuter.y) / 2,
  };

  const faceWidth = Math.max(1, Math.hypot(rightJaw.x - leftJaw.x, rightJaw.y - leftJaw.y));
  const eyeToChin = Math.max(1, Math.hypot(chin.x - eyeCenter.x, chin.y - eyeCenter.y));

  const yawNorm = (noseTip.x - eyeCenter.x) / (faceWidth / 2);
  const pitchNorm = (noseTip.y - eyeCenter.y) / eyeToChin;
  const rollDeg = (Math.atan2(rightEyeOuter.y - leftEyeOuter.y, rightEyeOuter.x - leftEyeOuter.x) * 180) / Math.PI;

  return {
    yawDeg: yawNorm * 45,
    pitchDeg: (pitchNorm - 0.45) * 80,
    rollDeg,
    gazeXProxy: yawNorm,
  };
};

const estimateIrisGaze = (meshLandmarks) => {
  if (!meshLandmarks || meshLandmarks.length < 478) return null;

  const rightIris = avgPoint(meshLandmarks, [468, 469, 470, 471, 472]);
  const leftIris = avgPoint(meshLandmarks, [473, 474, 475, 476, 477]);
  if (!rightIris || !leftIris) return null;

  const rightInner = meshLandmarks[133];
  const rightOuter = meshLandmarks[33];
  const rightTop = meshLandmarks[159];
  const rightBottom = meshLandmarks[145];

  const leftInner = meshLandmarks[362];
  const leftOuter = meshLandmarks[263];
  const leftTop = meshLandmarks[386];
  const leftBottom = meshLandmarks[374];

  if (!rightInner || !rightOuter || !rightTop || !rightBottom) return null;
  if (!leftInner || !leftOuter || !leftTop || !leftBottom) return null;

  const rightXR = safeRatio(rightIris.x, rightInner.x, rightOuter.x);
  const leftXR = safeRatio(leftIris.x, leftInner.x, leftOuter.x);
  const rightYR = safeRatio(rightIris.y, rightTop.y, rightBottom.y);
  const leftYR = safeRatio(leftIris.y, leftTop.y, leftBottom.y);

  return {
    x: ((rightXR - 0.5) + (leftXR - 0.5)) / 2,
    y: ((rightYR - 0.5) + (leftYR - 0.5)) / 2,
  };
};

const zoneFromSignals = (yaw, pitch, roll, gazeX, gazeY) => {
  const absYaw = Math.abs(yaw);
  const absPitch = Math.abs(pitch);
  const absRoll = Math.abs(roll);
  const absGazeX = Math.abs(gazeX);
  const absGazeY = Math.abs(gazeY);

  const headFocused =
    absYaw <= YAW_FOCUSED_MAX_DEG &&
    absPitch <= PITCH_FOCUSED_MAX_DEG &&
    absRoll <= ROLL_FOCUSED_MAX_DEG;

  const gazeFocused =
    absGazeX <= GAZE_X_FOCUSED_MAX &&
    absGazeY <= GAZE_Y_FOCUSED_MAX;

  if (headFocused && gazeFocused) return "focused";

  const headWarning =
    absYaw <= YAW_WARNING_MAX_DEG &&
    absPitch <= PITCH_WARNING_MAX_DEG &&
    absRoll <= ROLL_WARNING_MAX_DEG;

  const gazeWarning =
    absGazeX <= GAZE_X_WARNING_MAX &&
    absGazeY <= GAZE_Y_WARNING_MAX;

  // Strict distracted rule: both head and gaze must be strongly off.
  if (!headWarning && !gazeWarning) return "distracted";
  return "warning";
};

const useFocusSession = (videoRef) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [focusState, setFocusState] = useState("idle");
  const [focusScore, setFocusScore] = useState(100);
  const [distractionCount, setDistractionCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const timerRef = useRef(null);
  const detectionRef = useRef(null);
  const streakRef = useRef(0);
  const faceMeshRef = useRef(null);
  const latestMeshPresenceRef = useRef(false);
  const latestIrisRef = useRef(null);
  const awayMissRef = useRef(0);
  const lowLightMissRef = useRef(0);
  const lumaCanvasRef = useRef(null);
  const poseBufferRef = useRef({ yaw: [], pitch: [], roll: [], gazeX: [], gazeY: [] });
  const stateHoldRef = useRef({ warning: 0, distracted: 0 });
  const baselineRef = useRef({
    ready: false,
    yaw: 0,
    pitch: 0,
    roll: 0,
    gazeX: 0,
    gazeY: 0,
    frames: 0,
  });

  useEffect(() => {
    let cancelled = false;

    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);

        const { FaceMesh } = await import("@mediapipe/face_mesh");
        const mesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        mesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        mesh.onResults((results) => {
          const face = results?.multiFaceLandmarks?.[0] || null;
          latestMeshPresenceRef.current = !!face;
          latestIrisRef.current = estimateIrisGaze(face);
        });

        if (cancelled) {
          mesh.close();
          return;
        }

        faceMeshRef.current = mesh;
        setModelsLoaded(true);
      } catch (err) {
        console.error("❌ Failed to load models:", err);
      }
    };

    loadModels();

    return () => {
      cancelled = true;
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
        faceMeshRef.current = null;
      }
    };
  }, []);

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

  useEffect(() => {
    if (!isRunning || !modelsLoaded) return;

    const detectorOptions = new faceapi.TinyFaceDetectorOptions({
      inputSize: 320,
      scoreThreshold: 0.45,
    });

    detectionRef.current = setInterval(async () => {
      const video = videoRef?.current?.video ?? videoRef?.current;
      if (!video || video.readyState < 2 || video.paused) return;

      try {
        const luma = estimateFrameLuma(video, lumaCanvasRef);
        if (luma < LOW_LIGHT_LUMA_THRESHOLD) {
          lowLightMissRef.current += 1;
          if (lowLightMissRef.current >= LOW_LIGHT_HOLD_FRAMES) {
            setFocusState("low_light");
            streakRef.current = 0;
            setCurrentStreak(0);
            setFocusScore((prev) => Math.max(0, prev - WARNING_SCORE_PENALTY));
            return;
          }
        } else {
          lowLightMissRef.current = 0;
        }

        if (faceMeshRef.current) {
          await faceMeshRef.current.send({ image: video });
        }

        const detection = await faceapi
          .detectSingleFace(video, detectorOptions)
          .withFaceLandmarks(true);

        const hasFaceApi = !!detection && detection.detection.score >= MIN_DETECTION_CONFIDENCE;
        const hasFaceMesh = latestMeshPresenceRef.current;

        if (!hasFaceApi && !hasFaceMesh) {
          awayMissRef.current += 1;
          if (awayMissRef.current < AWAY_HOLD_FRAMES) return;

          latestIrisRef.current = null;
          setFocusState("away");
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - AWAY_SCORE_PENALTY));
          return;
        }

        awayMissRef.current = 0;

        if (!hasFaceApi && hasFaceMesh) {
          // Face mesh still sees the user; avoid false "away" due to temporary face-api miss.
          return;
        }

        const { left, right } = getEyePoints(detection.landmarks);
        const ear = (calcEAR(left) + calcEAR(right)) / 2;
        if (ear < EAR_DROWSY_THRESHOLD) {
          setFocusState("drowsy");
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - DISTRACTED_SCORE_PENALTY));
          return;
        }

        const pose = estimateHeadPose(detection.landmarks);
        const iris = latestIrisRef.current;

        const rawGazeX = iris?.x ?? pose.gazeXProxy;
        const rawGazeY = iris?.y ?? 0;

        const smoothedYaw = smoothPush(poseBufferRef.current.yaw, pose.yawDeg, ANGLE_SMOOTHING_WINDOW);
        const smoothedPitch = smoothPush(poseBufferRef.current.pitch, pose.pitchDeg, ANGLE_SMOOTHING_WINDOW);
        const smoothedRoll = smoothPush(poseBufferRef.current.roll, pose.rollDeg, ANGLE_SMOOTHING_WINDOW);
        const smoothedGazeX = smoothPush(poseBufferRef.current.gazeX, rawGazeX, ANGLE_SMOOTHING_WINDOW);
        const smoothedGazeY = smoothPush(poseBufferRef.current.gazeY, rawGazeY, ANGLE_SMOOTHING_WINDOW);

        if (!baselineRef.current.ready) {
          baselineRef.current.yaw += smoothedYaw;
          baselineRef.current.pitch += smoothedPitch;
          baselineRef.current.roll += smoothedRoll;
          baselineRef.current.gazeX += smoothedGazeX;
          baselineRef.current.gazeY += smoothedGazeY;
          baselineRef.current.frames += 1;

          if (baselineRef.current.frames >= CALIBRATION_FRAMES) {
            baselineRef.current.yaw /= baselineRef.current.frames;
            baselineRef.current.pitch /= baselineRef.current.frames;
            baselineRef.current.roll /= baselineRef.current.frames;
            baselineRef.current.gazeX /= baselineRef.current.frames;
            baselineRef.current.gazeY /= baselineRef.current.frames;
            baselineRef.current.ready = true;
          }
        }

        const baseline = baselineRef.current.ready
          ? baselineRef.current
          : { yaw: 0, pitch: 0, roll: 0, gazeX: 0, gazeY: 0 };

        const zone = zoneFromSignals(
          smoothedYaw - baseline.yaw,
          smoothedPitch - baseline.pitch,
          smoothedRoll - baseline.roll,
          smoothedGazeX - baseline.gazeX,
          smoothedGazeY - baseline.gazeY
        );

        if (zone === "distracted") {
          stateHoldRef.current.distracted += 1;
          stateHoldRef.current.warning = 0;
        } else if (zone === "warning") {
          stateHoldRef.current.warning += 1;
          stateHoldRef.current.distracted = 0;
        } else {
          stateHoldRef.current.warning = 0;
          stateHoldRef.current.distracted = 0;
        }

        if (stateHoldRef.current.distracted >= DISTRACTION_HOLD_FRAMES) {
          setFocusState("distracted");
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - DISTRACTED_SCORE_PENALTY));
          return;
        }

        if (stateHoldRef.current.warning >= WARNING_HOLD_FRAMES) {
          setFocusState("warning");
          streakRef.current = 0;
          setCurrentStreak(0);
          setFocusScore((prev) => Math.max(0, prev - WARNING_SCORE_PENALTY));
          return;
        }

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

  const resetTrackingState = () => {
    streakRef.current = 0;
    latestMeshPresenceRef.current = false;
    latestIrisRef.current = null;
    awayMissRef.current = 0;
    lowLightMissRef.current = 0;
    poseBufferRef.current = { yaw: [], pitch: [], roll: [], gazeX: [], gazeY: [] };
    stateHoldRef.current = { warning: 0, distracted: 0 };
    baselineRef.current = { ready: false, yaw: 0, pitch: 0, roll: 0, gazeX: 0, gazeY: 0, frames: 0 };
  };

  const startSession = useCallback(() => {
    setIsRunning(true);
    setFocusState("focused");
    setElapsedTime(0);
    setFocusScore(100);
    setDistractionCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    resetTrackingState();
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
    resetTrackingState();
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    isRunning,
    elapsedTime,
    focusState,
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
