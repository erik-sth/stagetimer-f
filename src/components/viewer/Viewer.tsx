import { useState, useEffect } from "react";
import "./Viewer.css"; // Make sure the path matches your project structure
import FullscreenBtn from "../Buttons/Fullscreen/FullscreenBtn";
import MirrorBtn from "../Buttons/Mirror/MirrorBtn";

interface Props {
  showClock: boolean;
  state: "Paused" | "Stopped" | "Ticking";
  remainingTimer: number;
  startTime: Date;
  endTime: Date;
  countUp: boolean; // true => countup; false => countdown
  previousTimer: number;
  headerText: string;
  followTimer: boolean; // true => follows Timer; false => follows Date
}

const Viewer = ({
  showClock,
  state,
  remainingTimer,
  startTime,
  previousTimer,
  countUp,
  headerText,
  followTimer,
  endTime,
}: Props) => {
  const [time, setTime] = useState<Date>(new Date());
  const [timer, setTimer] = useState<number>(() => calculateStartTime()); // 2 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());

      if (state === "Ticking") {
        setTimer((prevTimer) => (countUp ? prevTimer + 1 : prevTimer - 1));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state, countUp]);

  useEffect(() => {
    if (state == "Stopped") {
      setTimer(previousTimer);
    }
  }, [state, previousTimer]);

  function calculateStartTime():number {
    let output:number;
    const now = new Date();

    if (followTimer && countUp) {
      output = 0;
    } else if (!followTimer && countUp) {
      output = (new Date().getTime() - startTime.getTime()) / 1000;
    } else if (!followTimer && !countUp) {
      output = (endTime.getTime() - now.getTime()) / 1000;
    } else {
      const elapsedSeconds = (now.getTime() - startTime.getTime()) / 1000;
      output = remainingTimer - elapsedSeconds;
    }
    return Math.floor(output);
  }

  const formatCountdown = (seconds: number) => {
    const isNegative = seconds < 0;

    const absoluteSeconds = Math.abs(seconds);
    const hours = Math.floor(absoluteSeconds / 3600);
    const minutes = Math.floor((absoluteSeconds % 3600) / 60);
    const remainingSeconds = absoluteSeconds % 60;

    const formattedHours = hours > 0 ? `${hours.toString()}` : "";
    const formattedMinutes =
      minutes > 0 || hours > 0 ? `${minutes.toString().padStart(2, "0")}` : "0";
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    const negativePrefix = isNegative ? "-" : "";

    return (
      <span className={(isNegative || seconds < 61) && !countUp ? "red" : ""}>
        <span>{negativePrefix}</span>
        {formattedHours && <span>{formattedHours}:</span>}
        <span>{formattedMinutes}:</span>
        <span>{formattedSeconds}</span>
      </span>
    );
  };

  return (
    <>
      <div className="viewer">
        <div className="buttons">
          <MirrorBtn />
          <FullscreenBtn />
        </div>
        {/* "Begins in..." text */}
        <div className="headerText">{headerText}</div>
        {/* Countdown Timer */}
        <div className="countdown">{formatCountdown(timer)}</div>
        {/* Current Time */}
        {showClock && (
          <div className="currentTime">{time.toLocaleTimeString()}</div>
        )}
      </div>
    </>
  );
};

export default Viewer;
