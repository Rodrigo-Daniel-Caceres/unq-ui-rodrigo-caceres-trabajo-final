import "./GameLetterBox.css";

const GameLetterBox = ({
  letter,
  state,
  selected,
  reveal,
  loading,
  active,
  onClick,
}) => {
  return (
    <div
      className={`letter-box ${state || ""} ${selected ? "selected" : ""} ${
        reveal ? "reveal" : ""
      } ${loading ? "loading" : ""} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default GameLetterBox;
