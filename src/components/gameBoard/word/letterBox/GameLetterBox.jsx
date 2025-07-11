import "./GameLetterBox.css";

const GameLetterBox = ({ letter, state, selected, onClickCell }) => {
  return (
    <div
      onClick={() => onClickCell()}
      className={`letter-box ${state || ""} ${selected ? "selected" : ""}`}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default GameLetterBox;
