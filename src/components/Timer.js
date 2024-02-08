import React, { useState, useEffect } from "react";
import Button from "./Button";

const Timer = () => {
  const [focus, setFocus] = useState(false);
  const [timer, setTimer] = useState(300);
  const [inputValue, setInputValue] = useState("");
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval;
    if (start && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [start, timer]);

  const handleStart = () => {
    setFocus(false);
    setStart(!start);
  };

  const handleReset = () => {
    setFocus(false);
    setStart(false);
    setTimer(300);
  };

  const handleTimerClick = () => {
    setFocus(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== "" && parseInt(value) >= 0) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    if (!inputValue.trim().match(/^\d+$/)) {
      setInputValue("");
      return;
    }
    const totalSeconds = parseInt(inputValue);
    setTimer(totalSeconds);
    setStart(false);
    setInputValue("");
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <main>
      {focus ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <div onClick={handleTimerClick}>{`${minutes
          .toString()
          .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`}</div>
      )}
      <div>
        <Button name="start" onClick={handleStart} />
        <Button name="reset" onClick={handleReset} />
      </div>
    </main>
  );
};

export default Timer;
