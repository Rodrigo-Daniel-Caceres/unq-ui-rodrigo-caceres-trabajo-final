import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../context/GameContext";
import GameLetterBox from "./letterBox/GameLetterBox";
import "./GameWord.css";

const GameWord = ({ wordLenght, active, result = [], presetLetters = [] }) => {
  const { gameSessionId, postCheckWord, registerAttempt } =
    useContext(GameContext);

  const [letters, setLetters] = useState(
    presetLetters.length ? presetLetters : Array(wordLenght).fill("")
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = async (e) => {
      const key = e.key.toLowerCase();

      if (/^[a-zñ]$/.test(key)) {
        if (selectedIndex < wordLenght && !submitted) {
          const newLetters = [...letters];
          newLetters[selectedIndex] = key;
          setLetters(newLetters);

          setSelectedIndex((prev) =>
            prev + 1 < wordLenght ? prev + 1 : wordLenght
          );
        }
      }

      if (key === "backspace") {
        const newLetters = [...letters];
        if (selectedIndex < wordLenght && newLetters[selectedIndex]) {
          newLetters[selectedIndex] = "";
        } else {
          const newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
          newLetters[newIndex] = "";
          setSelectedIndex(newIndex);
        }
        setLetters(newLetters);
      }

      if (key === "enter") {
        if (letters.every((l) => l)) {
          try {
            const res = await postCheckWord(gameSessionId, letters.join(""));
            registerAttempt(letters, res);
            setSubmitted(true);
          } catch (err) {
            alert("Palabra no válida");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [letters, selectedIndex, active, submitted]);

  return (
    <div className="game-word">
      {letters.map((letter, i) => (
        <GameLetterBox
          key={i}
          letter={letter}
          state={result[i]?.solution}
          selected={i === selectedIndex && active && !submitted}
        />
      ))}
    </div>
  );
};

export default GameWord;
