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
  headerText: String;
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
  const [time, setTime] = useState(new Date());
  const [timer, setTimer] = useState(() => calculateStartTime()); // 2 hours in seconds

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const countdownId = setInterval(() => {
      if (state == "Ticking") {
        if (countUp == false) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setTimer((prevTimer) => prevTimer + 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timeId);
      clearInterval(countdownId);
    };
  }, []);

  useEffect(() => {
    if (state == "Stopped") {
      setTimer(previousTimer);
    }
  }, [state]);

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  function calculateStartTime() {
    if (followTimer && countUp) {
      return 0; // Count up starting from 0 when followTimer is true
    } else if (!followTimer && countUp) {
      // Calculate time difference using getTime() to ensure arithmetic is valid
      return Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    } else if (!followTimer && !countUp) {
      // Handle followTimer == true and countUp == false case (countdown with followTimer)
      const now = new Date();
      return Math.floor((endTime.getTime() - now.getTime()) / 1000);
    }

    const now = new Date();
    // Difference in seconds
    const elapsedSeconds = Math.floor(
      (now.getTime() - startTime.getTime()) / 1000
    );

    return remainingTimer - elapsedSeconds;
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
