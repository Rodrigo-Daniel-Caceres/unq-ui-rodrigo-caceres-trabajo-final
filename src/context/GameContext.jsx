import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(null);
  const [gameWordLenght, setGameWordLenght] = useState(0);
  const url = "https://word-api-hmlg.vercel.app/api";

  useEffect(() => {}, []);

  const handleError = (error) => {};

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
      setGameSessionId(res.sessionId);
      setGameWordLenght(res.wordLenght);
      setGameStarted(true);
    } catch (error) {
      handleError(error);
    }
  };

  const postCheckWord = async (sessionId, word) => {
    try {
      const res = await axios.post(`${url}/checkWord`, { sessionId, word });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        getDiffilcuties,
        getGameSession,
        postCheckWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
