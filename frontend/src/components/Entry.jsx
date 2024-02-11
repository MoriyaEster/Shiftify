import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '/src/App.css';

export const Entry = ({ workPlaceValue , userID}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    if (isRunning) return;
    const jsonData = {
      "time": time,
      "workPlaceValue": workPlaceValue,
      "userID": userID
    };
    console.log("jsonData ", jsonData);
    console.log("time ", time);
    console.log("Selected work place value: ", workPlaceValue);
    console.log("Selected used id: ", userID);
    setTime(0);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "עצור" : "התחל"}
        </button>
        <button className="stopwatch-button" onClick={reset}>
          סיום משמרת
        </button>
      </div>
    </div>
  );
};

export default Entry;
