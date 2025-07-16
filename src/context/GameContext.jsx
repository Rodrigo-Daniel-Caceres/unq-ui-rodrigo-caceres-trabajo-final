import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(null);
  const [gameWordLenght, setGameWordLenght] = useState(0);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);
  const [gameWords, setGameWords] = useState([]);
  const [usedKeys, setUsedKeys] = useState({});
  const [forcedEnd, setForcedEnd] = useState(false);
  const maxAttempts = 6;
  const url = "https://word-api-hmlg.vercel.app/api";

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      toast.error("La palabra no existe");
    } else if (error.response && error.response.status === 404) {
      toast.error("La sesión de juego no fue encontrada");
    } else {
      toast.error("Error de conexión, por favor intente más tarde");
    }
  };

  const restartGame = async () => {
    setGameStarted(false);
    setGameSessionId(null);
    setGameWordLenght(0);
    setCurrentAttemptIndex(0);
    setGameWords([]);
    setUsedKeys({});
    setForcedEnd(false);
  };

  const getDiffilcuties = async () => {
    try {
      const res = await axios.get(`${url}/difficulties`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getGameSession = async (difficulty) => {
    try {
      setGameDifficulty(difficulty);
      const res = await axios.get(`${url}/difficulties/${difficulty.id}`);
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
    try {
      const res = await axios.post(`${url}/checkWord`, { sessionId, word });
      return res.data;
    } catch (err) {
      handleError(err);
    }
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
        gameDifficulty,
        forcedEnd,
        setForcedEnd,
        restartGame,
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
