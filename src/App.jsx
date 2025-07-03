import { GameProvider } from "./context/GameContext";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <GameProvider>
      <Menu />
    </GameProvider>
  );
}

export default App;
