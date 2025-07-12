import "./GameLetterBox.css";

const GameLetterBox = ({ letter, state, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`letter-box ${state || ""} ${selected ? "selected" : ""}`}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default GameLetterBox;
