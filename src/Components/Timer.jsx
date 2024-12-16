/* eslint-disable react/prop-types */
import soundfile from "../assets/alarm.mp3"

export default function Timer({
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
  
  