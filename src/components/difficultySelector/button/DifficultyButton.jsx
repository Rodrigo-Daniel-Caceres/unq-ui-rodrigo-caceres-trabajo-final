import "./DifficultyButton.css";

const DifficultyButton = ({ difficulty, onSelect }) => {
  return (
    <button className="difficulty-button" onClick={() => onSelect(difficulty)}>
      {difficulty.name}
    </button>
  );
};

export default DifficultyButton;
