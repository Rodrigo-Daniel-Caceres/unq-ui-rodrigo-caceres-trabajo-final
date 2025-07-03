import { createContext, useEffect, useState } from "react";

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {}, []);

  const handleError = (error) => {};

  const getDiffilcuties = async () => {};

  const getGameSession = async () => {};

  const postCheckWord = async () => {};

  return (
    <GameContext.Provider
      value={{
        getDiffilcuties,
        getGameSession,
        postCheckWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
