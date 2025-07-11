import { createContext, useState } from "react";
import axios from "axios";
export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(null);
  const [gameWordLenght, setGameWordLenght] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [gameWords, setGameWords] = useState([]);
  const url = "https://word-api-hmlg.vercel.app/api";

  const handleError = (error) => {};

  const startNewGame = (session) => {
    setGameSessionId(session.sessionId);
    setGameWordLenght(session.wordLenght);
    setCurrentWord(0);
    setGameWords(Array(6).fill(null));
    setGameStarted(true);
  };

  const getDiffilcuties = async () => {
    try {
      const res = await axios.get(`${url}/difficulties`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  };

  const getGameSession = async (difficultyId) => {
    try {
      const res = await axios.get(`${url}/difficulties/${difficultyId}`);
      startNewGame(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const postCheckWord = async (word) => {
    try {
      const res = await axios.post(`${url}/checkWord`, {
        sessionId: gameSessionId,
        word,
      });

      const result = res.data; // array de { letter, solution }

      setGameWords((prev) => {
        const updated = [...prev];
        updated[currentWord] = result;
        return updated;
      });

      // Verificar si ganó
      const didWin = result.every((r) => r.solution === "correct");

      if (didWin) {
        // Ganó
        console.log("¡Ganaste!");
        // Podés setear un estado tipo setGameEnded(true)
      } else if (currentWord + 1 >= maxAttempts) {
        // Perdiste
        console.log("Perdiste 😢");
      } else {
        // Avanzar intento
        setCurrentWord((prev) => prev + 1);
      }

      return result;
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Palabra inválida. Intenta con otra.");
      } else if (error.response?.status === 404) {
        alert("Sesión no válida. Reiniciá el juego.");
      } else {
        handleError(error);
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        gameWordLenght,
        maxAttempts,
        currentWord,
        gameWords,
        getDiffilcuties,
        getGameSession,
        postCheckWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
