// Function - Native
import Link from "next/link";

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
        <Link href="https://github.com/maikaodev" target="_blank">
          maikaodev
        </Link>{" "}
        &copy; 2023
      </p>
      <nav id="social_network_list">
        <li className="social_network">
          <Link
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
            rel="noreferrer"
          >
            <SlSocialLinkedin />
          </Link>
        </li>
        <li className="social_network">
          <Link
            href="https://github.com/maikaodev"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
          </Link>
        </li>
        <li className="social_network">
          <Link
            href="mailto:maikao.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <SiGmail />
          </Link>
        </li>
        <li className="social_network">
          <Link
            href="https://portfolio-maikaodev.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <MdContactPage />
          </Link>
        </li>
      </nav>
    </footer>
  );
};
