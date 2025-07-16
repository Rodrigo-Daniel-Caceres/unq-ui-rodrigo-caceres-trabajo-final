import { GameContext } from "../../context/GameContext";
import { useEffect, useState, useContext } from "react";
import DifficultyButton from "./button/DifficultyButton";
import "./DifficultySelector.css";

const DifficultySelector = () => {
  const { getDiffilcuties, getGameSession } = useContext(GameContext);
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDifficulties();
  }, []);

  const fetchDifficulties = async () => {
    const data = await getDiffilcuties();
    setDifficulties(data);
    setLoading(false);
  };

  const handleSelect = async (difficulty) => {
    await getGameSession(difficulty);
  };

  return (
    <div className="difficulty-selector">
      <h3 className="text-center mb-3">ELIGE LA DIFICULTAD</h3>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border custom-spinner" role="status" />
        </div>
      ) : (
        difficulties.map((difficulty) => (
          <DifficultyButton
            key={difficulty.id}
            difficulty={difficulty}
            onSelect={handleSelect}
          />
        ))
      )}
    </div>
  );
};

export default DifficultySelector;
