// Icons
import { FiGithub } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

//CSS
import "./style.css";

export const Footer = () => {
  return (
    <footer>
      <p>
        Desenvolvido por{" "}
        <a href="https://github.com/maikaodev" target="_blank">
          maikaodev
        </a>{" "}
        &copy; 2023
      </p>
      <nav id="social_network_list">
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
      </nav>
    </footer>
  );
};
