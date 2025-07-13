import { useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!active || submitted || loading) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (/^[a-zñ]$/.test(key)) {
        addLetter(key);
      }
      if (key === "backspace") {
        deleteLetter();
      }
      if (key === "enter") {
        submitAttemp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [letters, selectedIndex, active, submitted, loading]);

  function addLetter(key) {
    if (selectedIndex < wordLenght) {
      const newLetters = [...letters];
      newLetters[selectedIndex] = key;
      setLetters(newLetters);
      setSelectedIndex((prev) =>
        prev + 1 < wordLenght ? prev + 1 : wordLenght
      );
    }
  }

  async function submitAttemp() {
    if (letters.every((l) => l)) {
      setLoading(true);
      const res = await postCheckWord(gameSessionId, letters.join(""));
      if (res) {
        registerAttempt(letters, res);
        setSubmitted(true);
      }
      setLoading(false);
    }
  }

  function deleteLetter() {
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

  return (
    <div className="game-word">
      {letters.map((letter, i) => (
        <GameLetterBox
          key={i}
          letter={letter}
          state={result[i]?.solution}
          selected={i === selectedIndex && active && !submitted}
          reveal={!!result[i]}
          loading={loading && active && !submitted}
          onClick={() => {
            if (active && !submitted && !loading) {
              setSelectedIndex(i);
            }
          }}
        />
      ))}
    </div>
  );
};

export default GameWord;
