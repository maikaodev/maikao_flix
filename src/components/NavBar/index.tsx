// Functions - Native
import { Link } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { Sidebar } from "../Sidebar";

// TS

export const NavBar = () => {
  //
  const [classMenu, setClassMenu] = useState<string>("hide");
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (classMenu === "hide") return setClassMenu("show");
    setClassMenu("hide");
  };

  return (
    <header>
      <nav id="topo">
        <Link to="/">
          <BiCameraMovie id="icon" />
          MaikaoFlix
        </Link>
        <button onClick={handleClick}>
          {!isActive && <AiOutlineMenu />}
          {isActive && <AiOutlineClose />}
        </button>
      </nav>
      <Sidebar classNav={classMenu} />
    </header>
  );
};
