import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { InputText } from "../InputText";
import "./style.css";

export const Sidebar = ({ isActive }: { isActive: boolean }) => {
  const [hideIt, setHideIt] = useState<boolean>(false);
  const hiddenMenu = () => {
    setHideIt(!hideIt);
  };
  return (
    <>
      <aside className={isActive ? "sm_menu" : ""}>
        <nav id="menu">
          {!hideIt && (
            <>
              <li>
                <a href="/filmes?page=1">Filmes</a>
              </li>
              <li>
                <a href="/series?page=1">Séries</a>
              </li>
              <li id="search">
                <button onClick={hiddenMenu}>Buscar</button>
              </li>
            </>
          )}
          {hideIt && (
            <li id="form">
              <AiOutlineArrowLeft id="arrow-back" onClick={hiddenMenu} />
              <InputText />
            </li>
          )}
        </nav>
      </aside>
    </>
  );
};
