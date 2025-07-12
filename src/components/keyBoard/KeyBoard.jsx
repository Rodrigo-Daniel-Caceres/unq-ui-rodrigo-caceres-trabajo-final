import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import "./KeyBoard.css";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["ENTER", "z", "x", "c", "v", "b", "n", "m", "BACKSPACE"],
];

const KeyBoard = () => {
  const { usedKeys } = useContext(GameContext);

  const handleVirtualKeyPress = (key) => {
    const event = new KeyboardEvent("keydown", { key });
    window.dispatchEvent(event);
  };

  const getKeyClass = (key) => {
    if (usedKeys[key] === ("correct" || "elsewhere")) return "key correct";
    if (usedKeys[key] === "absent") return "key absent";
    return "key";
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div className="key-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => handleVirtualKeyPress(key)}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyBoard;
