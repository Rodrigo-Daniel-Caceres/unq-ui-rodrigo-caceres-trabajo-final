import logo from "../../assets/logo.png";
import "./Menu.css";

const Menu = ({}) => {
  const handleRestart = () => {
    console.log("New Game");
  };

  return (
    <header id="main-menu">
      <div className="center">
        <span>WORDLE</span>
      </div>
    </header>
  );
};

export default Menu;
