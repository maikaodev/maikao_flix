// Functions - Native
import { Link } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { InputText } from "../InputText";
import { Sidebar } from "../Sidebar";

// TS

export const NavBar = () => {
  //
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header>
      <nav id="topo">
        <Link id="link" to="/">
          <BiCameraMovie id="icon" />
          <span>MaikaoFlix</span>
        </Link>
        <button onClick={handleClick}>
          {!isActive && <AiOutlineMenu />}
          {isActive && <AiOutlineClose />}
        </button>
        {isActive && <Sidebar />}
      </nav>
      <InputText />
    </header>
  );
};
