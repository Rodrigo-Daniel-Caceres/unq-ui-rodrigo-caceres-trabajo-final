import "./GameWord.css";

const GameWord = ({ wordLenght }) => {
  const length = Array.from({ length: wordLenght });
  return (
    <div className="game-word">
      {length.map((index) => (
        <div className="letter-box" key={index}></div>
      ))}
    </div>
  );
};

export default GameWord;
