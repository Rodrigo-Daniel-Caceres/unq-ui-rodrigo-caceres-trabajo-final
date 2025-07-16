import "./GameModal.css";

const GameModal = ({ show, win, onReplay, onReset }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <h3>{win ? "¡Adivinaste la palabra!" : "¡Agotaste los intentos!"}</h3>
        <div className="modal-buttons">
          <button className="btn btn-success" onClick={onReplay}>
            Volver a jugar
          </button>
          <button className="btn btn-secondary" onClick={onReset}>
            Seleccionar dificultad
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
