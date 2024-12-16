/* eslint-disable react/prop-types */
export default function Session({
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
  