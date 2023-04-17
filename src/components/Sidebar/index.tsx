import Link from "next/link";
import { useState } from "react";

import S from "./Sidebar.module.css";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { InputText } from "../InputText";

export const Sidebar = ({ isActive }: { isActive: boolean }) => {
  const [hideIt, setHideIt] = useState<boolean>(false);
  const hiddenMenu = () => {
    setHideIt(!hideIt);
  };
  return (
    <>
      <aside className={isActive ? S.sm_menu : S.xl_menu}>
        <nav className={S.menu}>
          {!hideIt && (
            <>
              <li>
                <Link data-testid="movies_page" href="/categoria/filmes?page=1">
                  Filmes
                </Link>
              </li>
              <li>
                <Link data-testid="series_page" href="/categoria/series?page=1">
                  Séries
                </Link>
              </li>
              <li className={S.search}>
                <button onClick={hiddenMenu}>Buscar</button>
              </li>
            </>
          )}
          {hideIt && (
            <li className={S.form}>
              <AiOutlineArrowLeft
                className={S.arrow_back}
                onClick={hiddenMenu}
              />
              <InputText />
            </li>
          )}
        </nav>
      </aside>
    </>
  );
};
