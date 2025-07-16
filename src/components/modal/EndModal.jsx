import "./Modal.css";

const EndModal = ({ show, win, onReplay, onReset }) => {
  if (!show) return null;

  return (
    <div className="backdrop">
      <div className="modal-container">
        {win ? (
          <>
            <div className="modal-title">FELICIDADES</div>
            <p>Lograste encontrar la palabra oculta.</p>
          </>
        ) : (
          <>
            <div className="modal-title">PERDISTE</div>
            <p>No lograste encontrar la palabra oculta.</p>
          </>
        )}
        <div className="modal-buttons">
          <button className="modal-button" onClick={onReplay}>
            JUGAR DE NUEVO
          </button>
          <button className="modal-button" onClick={onReset}>
            ELEGIR DIFFICULTAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
