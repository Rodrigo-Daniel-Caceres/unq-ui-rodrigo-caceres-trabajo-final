import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./GameBoard.css";
import GameWord from "./word/GameWord";

const GameBoard = () => {
  const { gameWordLenght } = useContext(GameContext);
  const attempts = Array.from({ length: 6 });

  return (
    <div className="game-board">
      {attempts.map((index) => (
        <GameWord wordLenght={gameWordLenght} key={index} />
      ))}
    </div>
  );
};

export default GameBoard;
