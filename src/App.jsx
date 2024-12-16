/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import soundfile from "./assets/alarm.mp3";
import "./App.css";

export default function Clock() {
  const [sessLength, setSessLength] = useState(25);
  const [brLength, setBrLength] = useState(5);
  const [timer, setTimer] = useState({
    minutes: 25,
    seconds: 0,
  });
  const [timerOn, setTimerOn] = useState(false);
  const [currentCycle, setCurrentCycle] = useState("Session");
  const defaultTimer = useRef(timer);
  const defaultSessLength = useRef(sessLength);
  const defaultBrLength = useRef(brLength);
  const alarm = useRef(null);

  function handlePlay() {
    setTimerOn(true);
  }

  function handleStop() {
    setTimerOn(false);
  }

  function handleReset() {
    setTimerOn(false);
    setTimer(defaultTimer.current);
    setBrLength(defaultBrLength.current);
    setSessLength(defaultSessLength.current);
    setCurrentCycle("Session");
    alarm.current.load();
  }

  function timerUpdate(newLength, cycle) {
    if (currentCycle === cycle) {
      setTimer({
        minutes: newLength,
        seconds: 0,
      });
    }
  }

  function handleBrIncrease() {
    if (brLength < 60) {
      const newLength = brLength + 1;
      const cycle = "Break";
      setBrLength(newLength);
      timerUpdate(newLength, cycle);
    } else {
      return;
    }
  }

  function handleBrDecrease() {
    if (brLength > 1) {
      const newLength = brLength - 1;
      const cycle = "Break";
      setBrLength(newLength);
      timerUpdate(newLength, cycle);
    } else {
      return;
    }
  }

  function handleSessIncrease() {
    if (sessLength < 60) {
      const newLength = sessLength + 1;
      const cycle = "Session";
      setSessLength(newLength);
      timerUpdate(newLength, cycle);
    } else {
      return;
    }
  }

  function handleSessDecrease() {
    if (sessLength > 1) {
      const newLength = sessLength - 1;
      const cycle = "Session";
      setSessLength(newLength);
      timerUpdate(newLength, cycle);
    } else {
      return;
    }
  }

  useEffect(() => {
    let intervalId;
    function countDown() {
      if (timer.minutes > 0) {
        if (timer.seconds !== 0) {
          setTimer({
            minutes: timer.minutes,
            seconds: timer.seconds - 1,
          });
        } else if (timer.seconds === 0) {
          setTimer({
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        }
      } else if (timer.minutes === 0) {
        if (timer.seconds !== 0) {
          setTimer({
            minutes: timer.minutes,
            seconds: timer.seconds - 1,
          });
        } else if (timer.seconds === 0) {
          alarm.current.play();
          if (currentCycle === "Session") {
            setCurrentCycle("Break");
            setTimer({
              minutes: brLength,
              seconds: 0,
            });
          } else {
            setCurrentCycle("Session");
            setTimer({
              minutes: sessLength,
              seconds: 0,
            });
          }
        }
      }
    }
    console.log("holi");
    if (timerOn === true) {
      intervalId = setTimeout(countDown, 1000);
    }
    return () => {
      clearTimeout(intervalId);
    };
  }, [
    timerOn,
    brLength,
    currentCycle,
    sessLength,
    timer.minutes,
    timer.seconds,
  ]);

  return (
    <div id="main">
      <div id="clock">
        <div id="header">25 + 5 Clock</div>
        <div id="timer">
          <Timer
            timer={timer}
            handlePlay={handlePlay}
            handleStop={handleStop}
            handleReset={handleReset}
            timerOn={timerOn}
            currentCycle={currentCycle}
            alarm={alarm}
          />
        </div>
        <div id="break">
          <Break
            timer={timer}
            brLength={brLength}
            handleBrIncrease={handleBrIncrease}
            handleBrDecrease={handleBrDecrease}
            timerOn={timerOn}
          />
        </div>
        <div id="session">
          <Session
            timer={timer}
            sessLength={sessLength}
            handleSessIncrease={handleSessIncrease}
            handleSessDecrease={handleSessDecrease}
            timerOn={timerOn}
          />
        </div>
      </div>
    </div>
  );
}

function Timer({
  timer,
  handlePlay,
  handleStop,
  handleReset,
  timerOn,
  currentCycle,
  alarm,
}) {
  let timerDisplay = `${
    timer.minutes > 9 ? timer.minutes : "0" + timer.minutes
  }:${timer.seconds > 9 ? timer.seconds : "0" + timer.seconds}`;
  return (
    <>
      <div id="timer-label">{currentCycle}</div>
      <div id="time-left">{timerDisplay}</div>
      <div id="timer-buttons-wrap">
        <button
          id="start_stop"
          onClick={timerOn === false ? handlePlay : handleStop}
        >
          <span id="play">&#9654;</span>
          <span id="pause">&#9208;</span>
        </button>
        <button id="reset" onClick={handleReset}>
          <span>&#8634;</span>
        </button>
      </div>
      <audio ref={alarm} src={soundfile} type="audio/mp3"></audio>
    </>
  );
}

function Break({ brLength, handleBrDecrease, handleBrIncrease, timerOn }) {
  return (
    <>
      <div id="break-label">Break Length</div>
      <div className="settings">
        <button
          id="break-decrement"
          onClick={!timerOn ? handleBrDecrease : null}
        >
          -
        </button>
        <div id="break-length">{brLength}</div>
        <button
          id="break-increment"
          onClick={!timerOn ? handleBrIncrease : null}
        >
          +
        </button>
      </div>
    </>
  );
}

function Session({
  sessLength,
  handleSessDecrease,
  handleSessIncrease,
  timerOn,
}) {
  return (
    <>
      <div id="session-label">Session Length</div>
      <div className="settings">
        <button
          id="session-decrement"
          onClick={!timerOn ? handleSessDecrease : null}
        >
          -
        </button>
        <div id="session-length">{sessLength}</div>
        <button
          id="session-increment"
          onClick={!timerOn ? handleSessIncrease : null}
        >
          +
        </button>
      </div>
    </>
  );
}
