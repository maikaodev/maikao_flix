import { Link } from "react-router-dom";
import "./style.css";

export const Sidebar = () => {
  return (
    <>
      <aside>
        <nav id="menu">
          <li>
            <Link to="/">Filmes</Link>
          </li>
          <li>
            <Link to="/">Séries</Link>
          </li>
          <li>
            <Link to="/">Atores</Link>
          </li>
        </nav>
      </aside>
    </>
  );
};
