// Functions - Native
import Link from "next/link";
import { useEffect, useState } from "react";

// Components
import { InputText } from "../InputText";
import { Sidebar } from "../Sidebar";

// CSS
import "./style.css";

// Icons
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";

export const NavBar = () => {
  //
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setIsActive(false);
      }
    });
  }, [window.scrollY]);

  return (
    <header>
      <nav id="topo">
        <Link id="link" href="/">
          <BiCameraMovie id="icon" />
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
