import "./Modal.css";

const TutorialModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="backdrop">
      <div className="modal-container">
        <div className="modal-title">COMO JUGAR</div>
        <p>
          El objetivo del juego es simple, adivinar la palabra oculta en al
          menos 6 intentos.
        </p>
        <p>
          Cada intento debe ser una palabra válida. En cada ronda el juego pinta
          cada letra de un color indicando si esa letra se encuentra o no en la
          palabra y si se encuentra en la posición correcta.
        </p>
        <div>
          <strong style={{ color: "var(--correct)" }}>VERDE</strong>: letra
          correcta en posición correcta.
        </div>
        <div>
          <strong style={{ color: "var(--elsewhere)" }}>AMARILLO</strong>: letra
          correcta en posición incorrecta.
        </div>
        <div>
          <strong style={{ color: "var(--absent)" }}>GRIS</strong>: letra no
          está en la palabra.
        </div>
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
