import Menu from "./components/menu/Menu";
import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import GameBoard from "./components/gameBoard/GameBoard";
import DifficultySelector from "./components/difficultySelector/DifficultySelector";

function App() {
  const { gameStarted } = useContext(GameContext);

  return (
    <>
      <Menu />
      {gameStarted ? <GameBoard /> : <DifficultySelector />}
    </>
  );
}

export default App;
