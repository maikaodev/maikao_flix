// Functions - Native
import Link from "next/link";
import { useState } from "react";

// Components
import { InputText } from "../InputText";
import { Sidebar } from "../Sidebar";

// CSS
import S from "./NavBar.module.css";

// Icons
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";

export const NavBar = () => {
  //
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className={S.header}>
      <nav className={S.topo}>
        <Link className={S.link} href="/">
          <BiCameraMovie className={S.icon} />
          <span>MaikaoFlix</span>
        </Link>
        <button onClick={handleClick}>
          {!isActive && <AiOutlineMenu />}
          {isActive && <AiOutlineClose />}
        </button>
        {<Sidebar isActive={isActive} />}
      </nav>
      <InputText />
    </header>
  );
};
