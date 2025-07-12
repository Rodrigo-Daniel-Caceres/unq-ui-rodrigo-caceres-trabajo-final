import { createContext, useState } from "react";
import axios from "axios";
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(null);
  const [gameWordLenght, setGameWordLenght] = useState(0);
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);
  const [maxAttempts] = useState(6);
  const [gameWords, setGameWords] = useState([]);
  const [usedKeys, setUsedKeys] = useState({});

  const url = "https://word-api-hmlg.vercel.app/api";

  const handleError = (err) => {
    console.error(err);
    alert("Error en la comunicación con la API");
  };

  const getDiffilcuties = async () => {
    const res = await axios.get(`${url}/difficulties`);
    return res.data;
  };

  const getGameSession = async (difficultyId) => {
    try {
      const res = await axios.get(`${url}/difficulties/${difficultyId}`);
      setGameSessionId(res.data.sessionId);
      setGameWordLenght(res.data.wordLenght);
      setGameStarted(true);
      setCurrentAttemptIndex(0);
      setGameWords(Array(6).fill(null));
      setUsedKeys({});
    } catch (err) {
      handleError(err);
    }
  };

  const postCheckWord = async (sessionId, word) => {
    const res = await axios.post(`${url}/checkWord`, { sessionId, word });
    return res.data;
  };

  const registerAttempt = (letters, results) => {
    const newList = [...gameWords];
    newList[currentAttemptIndex] = { letters, results };
    setGameWords(newList);
    setCurrentAttemptIndex((prev) => prev + 1);
    updateUsedKeys(results);
  };

  const updateUsedKeys = (results) => {
    const updated = { ...usedKeys };
    results.forEach(({ letter, solution }) => {
      const current = updated[letter];
      if (
        solution === "correct" ||
        (solution === "elsewhere" && current !== "correct")
      ) {
        updated[letter] = solution;
      } else if (!current) {
        updated[letter] = solution;
      }
    });
    setUsedKeys(updated);
  };

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        gameSessionId,
        gameWordLenght,
        currentAttemptIndex,
        maxAttempts,
        gameWords,
        usedKeys,
        getDiffilcuties,
        getGameSession,
        postCheckWord,
        registerAttempt,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
