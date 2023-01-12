import { BiSearchAlt2 } from "react-icons/bi";
import "./style.css";

const Home = () => {
  return (
    <>
      <div id="container">
        {/* HEADER */}
        <header>
          <h1>Bem-vindo(a).</h1>
          <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              name="procurando"
              placeholder="Buscar por um Filme ou Série..."
            />
            <button type="submit">
              <BiSearchAlt2 id="icon" />
            </button>
          </form>
        </header>
        {/* HEADER */}

        {/* MAIN */}
        <main>
          <section id="overview_top_rated">
            <div>
              <h2>Os mais populares</h2>
              <ul id="nav">
                <li>Na TV</li>
                <li>Nos Cinemas</li>
              </ul>
            </div>
            <div id="card_list">
              <ul>
                <li>Cartaz</li>
                <li>Cartaz</li>
                <li>Cartaz</li>
                <li>Cartaz</li>
                <li>Cartaz</li>
                <li>Cartaz</li>
                <li>Cartaz</li>
              </ul>
            </div>
          </section>
        </main>
        {/* MAIN */}

        <footer>
          Desenvolvido por{" "}
          <a href="https://github.com/maikaodev" target="_blank">
            maikaodev
          </a>
          &copy; 2023
        </footer>
      </div>
    </>
  );
};

export default Home;
