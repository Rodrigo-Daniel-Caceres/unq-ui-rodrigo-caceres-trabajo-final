import "./GameLetterBox.css";

const GameLetterBox = ({ letter, state, selected }) => {
  return (
    <div className={`letter-box ${state || ""} ${selected ? "selected" : ""}`}>
      {letter.toUpperCase()}
    </div>
  );
};

export default GameLetterBox;
