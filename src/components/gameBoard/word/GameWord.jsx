import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import "./GameWord.css";
import GameLetterBox from "./letterBox/GameLetterBox";

const GameWord = ({ wordIndex }) => {
  const { currentWord, gameWordLenght, postCheckWord } =
    useContext(GameContext);
  const [letters, setLetters] = useState(Array(gameWordLenght).fill("a"));
  const [result, setResult] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (wordIndex === currentWord) {
      setIsActive(true);
    }
  }, [currentWord]);

  const handleCellClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="game-word">
      {letters.map((letter, i) => (
        <GameLetterBox
          key={i}
          letter={letter}
          state={result[i]?.solution}
          selected={i === selectedIndex}
          onClickCell={() => handleCellClick?.(i)}
        />
      ))}
    </div>
  );
};

export default GameWord;
