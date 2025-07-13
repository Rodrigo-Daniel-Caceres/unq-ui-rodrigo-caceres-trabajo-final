import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./GameBoard.css";
import GameWord from "./word/GameWord";

const GameBoard = () => {
  const { gameWordLenght, maxAttempts, currentAttemptIndex, gameWords } =
    useContext(GameContext);

  return (
    <div className="game-board">
      {Array.from({ length: maxAttempts }).map((_, i) => (
        <GameWord
          key={i}
          wordLenght={gameWordLenght}
          active={i === currentAttemptIndex}
          result={gameWords[i]?.results}
          presetLetters={gameWords[i]?.letters}
        />
      ))}
    </div>
  );
};

export default GameBoard;
