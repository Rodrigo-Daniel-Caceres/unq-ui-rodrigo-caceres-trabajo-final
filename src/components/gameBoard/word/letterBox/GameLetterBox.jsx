import "./GameLetterBox.css";

const GameLetterBox = ({
  letter,
  state,
  selected,
  reveal,
  loading,
  onClick,
}) => {
  return (
    <div
      className={`letter-box ${state || ""} ${selected ? "selected" : ""} ${
        reveal ? "reveal" : ""
      } ${loading ? "loading" : ""}`}
      onClick={onClick}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default GameLetterBox;
