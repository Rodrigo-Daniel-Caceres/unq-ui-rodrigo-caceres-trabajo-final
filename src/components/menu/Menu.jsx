import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Menu.css";

const Menu = ({}) => {
  const handleRestart = () => {
    console.log("New Game");
  };

  return (
    <header id="main-menu">
      <div className="left">
        <img src={logo}></img>
      </div>
      <div className="center">
        <span>WORDLE</span>
      </div>
      <div className="right">
        <span className="logout" onClick={handleRestart}>
          NEW GAME
        </span>
      </div>
    </header>
  );
};

export default Menu;
