import { useCallback, useEffect, useRef, useState } from "react";

const useFocusSession = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [focusState, setFocusState] = useState("idle");
  const [focusScore, setFocusScore] = useState(100);
  const [distractionCount, setDistractionCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const timerRef = useRef(null);
  const focusSimRef = useRef(null);
  const streakRef = useRef(0);

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
    if (isRunning) {
      focusSimRef.current = setInterval(() => {
        const rand = Math.random();
        let newState;
        if (rand < 0.7) newState = "focused";
        else if (rand < 0.9) newState = "distracted";
        else newState = "drowsy";

        setFocusState(newState);

        if (newState === "focused") {
          streakRef.current += 1;
          setCurrentStreak(streakRef.current);
          setBestStreak((prev) => Math.max(prev, streakRef.current));
          setFocusScore((prev) => Math.min(100, prev + 2));
        } else {
          streakRef.current = 0;
          setCurrentStreak(0);
          setDistractionCount((prev) => prev + 1);
          setFocusScore((prev) => Math.max(0, prev - 10));
        }
      }, 3000);
    } else {
      clearInterval(focusSimRef.current);
    }
    return () => clearInterval(focusSimRef.current);
  }, [isRunning]);

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
    isRunning, elapsedTime, focusState, focusScore,
    distractionCount, bestStreak, currentStreak,
    startSession, stopSession, resetSession, formatTime,
  };
};

export default useFocusSession;