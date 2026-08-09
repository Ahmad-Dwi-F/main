import { useState, useEffect } from "react";
import "./CountdownTimer.css";

function formatUnit(value) {
  return String(value).padStart(2, "0");
}

function CountdownTimer({ durationSeconds = 3000, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) onExpire?.();
  }, [secondsLeft, onExpire]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="countdown-banner">
      <span>Selesaikan pemesanan dalam</span>
      <div className="countdown-boxes">
        <span className="countdown-box">{formatUnit(hours)}</span>
        <span className="countdown-colon">:</span>
        <span className="countdown-box">{formatUnit(minutes)}</span>
        <span className="countdown-colon">:</span>
        <span className="countdown-box">{formatUnit(seconds)}</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
