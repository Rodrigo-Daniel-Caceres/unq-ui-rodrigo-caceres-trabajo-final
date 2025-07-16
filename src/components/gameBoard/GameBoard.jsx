import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import "./GameBoard.css";
import GameWord from "./word/GameWord";
import toast from "react-hot-toast";
import GameModal from "../gameModal/GameModal";

const GameBoard = () => {
  const {
    gameWordLenght,
    currentAttemptIndex,
    maxAttempts,
    gameWords,
    getGameSession,
    restartGame,
    gameDifficulty,
  } = useContext(GameContext);
  const [showModal, setShowModal] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const lastResult = gameWords[currentAttemptIndex - 1]?.results;
    if (lastResult && lastResult.every((r) => r.solution === "correct")) {
      toast.success("Correct");
      setWin(true);
      setTimeout(() => setShowModal(true), 1000);
    } else if (currentAttemptIndex === maxAttempts) {
      toast.error("Incorrecto");
      setWin(false);
      setTimeout(() => setShowModal(true), 1000);
    }
  }, [currentAttemptIndex]);

  const handleReplay = async () => {
    const dificulty = gameDifficulty;
    await restartGame();
    getGameSession(dificulty);
    setShowModal(false);
  };

  const handleReset = async () => {
    await restartGame();
    setShowModal(false);
  };
  return (
    <>
      <div className="game-board">
        {Array.from({ length: maxAttempts }).map((_, i) => {
          const data = gameWords[i];
          return (
            <GameWord
              key={i}
              wordLenght={gameWordLenght}
              presetLetters={data?.letters || []}
              result={data?.results || []}
              active={i === currentAttemptIndex && !showModal}
            />
          );
        })}
      </div>

      <GameModal
        show={showModal}
        win={win}
        onReplay={handleReplay}
        onReset={handleReset}
      />
    </>
  );
};

export default GameBoard;
