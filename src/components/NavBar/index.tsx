import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { InputText } from "../InputText";
import { Sidebar } from "../Sidebar";

import S from "./NavBar.module.css";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";

export const NavBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const onScroll = useCallback(() => {
    if (isActive === true) setIsActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={S.header} data-test-id="header">
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
