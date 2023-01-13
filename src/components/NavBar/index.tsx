// Functions - Native
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { BiCameraMovie } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

// TS
import { FormEvent, useRef } from "react";

export const NavBar = () => {
  //
  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { name_movie } = Object.fromEntries(formData.entries());

    if (name_movie === "") {
      alert("Insira um nome válido");
    }
    if (name_movie) {
      navigate(`/${name_movie}`);
    }
    input.current!.value = "";
  };
  return (
    <nav id="topo">
      <Link to="/?page=1">
        <h2>
          <BiCameraMovie id="icon" />
          MaikaoFlix
        </h2>
      </Link>
      <div id="social_network_list">
        <li className="social_network">
          <a href="https://www.linkedin.com/in/maikaodev/" target="_blank">
            <SlSocialLinkedin />
          </a>
        </li>
        <li className="social_network">
          <a href="https://github.com/maikaodev" target="_blank">
            <FiGithub />
          </a>
        </li>
        <li className="social_network">
          <a href="mailto:maikao.dev@gmail.com" target="_blank">
            <SiGmail />
          </a>
        </li>
        <li className="social_network">
          <a href="https://portfolio-maikaodev.netlify.app/" target="_blank">
            <MdContactPage />
          </a>
        </li>
      </div>
    </nav>
  );
};
