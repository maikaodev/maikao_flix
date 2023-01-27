// Function - Native
import Link from "next/link";

// Icons
import { FiGithub } from "react-icons/fi";
import { MdContactPage } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

//CSS
import S from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={S.footer}>
      <p>
        Desenvolvido por{" "}
        <Link href="https://github.com/maikaodev" target="_blank">
          maikaodev
        </Link>{" "}
        &copy; 2023
      </p>
      <nav className={S.social_network_list}>
        <li className={S.social_network}>
          <Link
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
            rel="noreferrer"
          >
            <SlSocialLinkedin />
          </Link>
        </li>
        <li className={S.social_network}>
          <Link
            href="https://github.com/maikaodev"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
          </Link>
        </li>
        <li className={S.social_network}>
          <Link
            href="mailto:maikao.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <SiGmail />
          </Link>
        </li>
        <li className={S.social_network}>
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
