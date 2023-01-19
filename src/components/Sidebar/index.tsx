import { InputText } from "../InputText";
import "./style.css";

export const Sidebar = ({ classNav }: { classNav: string }) => {
  return (
    <>
      <aside className={classNav}>
        <nav>
          <ul id="menu_list">
            <li>Home</li>
            <li>About</li>
            <li>Anything</li>
          </ul>
        </nav>
      </aside>
      <aside id="laptop">
        <InputText />

        <nav>
          <ul id="menu_list">
            <li>Filmes</li>
            <li>Series</li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
