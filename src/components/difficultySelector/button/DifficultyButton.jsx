import "./DifficultyButton.css";

const DifficultyButton = ({ difficulty, onSelect }) => {
  return (
    <button
      className="difficulty-button"
      onClick={() => onSelect(difficulty.id)}
    >
      {difficulty.name}
    </button>
  );
};

export default DifficultyButton;
