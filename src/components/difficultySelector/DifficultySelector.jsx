import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const DifficultySelector = ({}) => {
  const { getGameSession } = useContext(GameContext);

  return (
    <div className="difficulty-selector">
      <span>Difficulty Selector</span>
      <button>Start Game</button>
    </div>
  );
};

export default DifficultySelector;
