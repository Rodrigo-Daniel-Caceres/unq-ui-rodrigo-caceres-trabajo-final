import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./GameBoard.css";
import GameWord from "./word/GameWord";

const GameBoard = () => {
  const { maxAttempts } = useContext(GameContext);

  return (
    <div className="game-board">
      {Array(maxAttempts)
        .fill()
        .map((_, i) => (
          <GameWord wordIndex={i} key={i} />
        ))}
    </div>
  );
};

export default GameBoard;
