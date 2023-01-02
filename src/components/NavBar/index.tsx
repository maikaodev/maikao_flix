import "./style.css";

import { Link } from "react-router-dom";

import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

export const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h2>
          <BiCameraMovie />
          MaikaoFlix
        </h2>
      </Link>
      <form onSubmit={(event) => event.preventDefault()}>
        <input type="text" placeholder="Buscar..." />
        <button type="submit">
          <BiSearchAlt2 id="icon" />
        </button>
      </form>
    </nav>
  );
};
