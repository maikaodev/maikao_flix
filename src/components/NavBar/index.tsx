// Functions - Native
import { Link } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { BiCameraMovie } from "react-icons/bi";

// TS

export const NavBar = () => {
  //

  return (
    <header>
      <nav id="topo">
        <Link to="/">
          <BiCameraMovie id="icon" />
          MaikaoFlix
        </Link>
      </nav>
    </header>
  );
};
