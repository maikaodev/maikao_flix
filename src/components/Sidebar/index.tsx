import "./style.css";

export const Sidebar = () => {
  return (
    <>
      <aside>
        <nav id="menu">
          <li>
            <a href="/filmes?page=1">Filmes</a>
          </li>
          <li>
            <a href="/series?page=1">Séries</a>
          </li>
          <li>
            <a href="/">Buscar</a>
          </li>
        </nav>
      </aside>
    </>
  );
};
