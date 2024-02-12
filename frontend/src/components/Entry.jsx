import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '/src/App.css';
import axios from 'axios';
import * as links from '/src/axios-handler.jsx';

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

  const reset = async () => {
    if (isRunning) return;
    const jsonData = {
      "time_worked": time,
      "work_place": workPlaceValue,
      "userID": userID,
      "date": new Date().toISOString().split('T')[0],
    };
    console.log("jsonData ", jsonData);
    console.log("time ", time);
    console.log("Selected work place value: ", workPlaceValue);
    console.log("Selected used id: ", userID);

    const response = await axios.post(links.url_work_hours, jsonData)
    .then(async function(response) {
      // Handle successful response if needed
    })
    .catch(async function(error) {
      // Handle error
      // Optionally, provide user feedback or take specific actions based on the error
    });

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
