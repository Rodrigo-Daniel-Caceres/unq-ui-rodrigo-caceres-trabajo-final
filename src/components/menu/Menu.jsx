import { useContext, useState } from "react";
import TutorialModal from "../modal/TutorialModal";
import "./Menu.css";
import { GameContext } from "../../context/GameContext";

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const { gameStarted, setForcedEnd } = useContext(GameContext);

  const handleEnd = () => {
    setForcedEnd(true);
  };

  return (
    <>
      <header id="main-menu">
        {gameStarted && (
          <div className="left">
            <button className="menu-button quit" onClick={handleEnd}>
              ABANDONAR
            </button>
          </div>
        )}
        <div className="center">
          <span>LA PALABRA OCULTA</span>
        </div>
        <div className="right">
          <button
            className="menu-button howto"
            onClick={() => setShowModal(true)}
          >
            COMO JUGAR
          </button>
        </div>
      </header>
      <TutorialModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Menu;
