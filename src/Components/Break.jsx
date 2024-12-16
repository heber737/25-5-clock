/* eslint-disable react/prop-types */
export default function Break({
  brLength,
  handleBrDecrease,
  handleBrIncrease,
  timerOn,
}) {
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
