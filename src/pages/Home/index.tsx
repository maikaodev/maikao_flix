import { Card } from "@/components";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import "./style.css";

type TopMoviesData = {
  backdrop_path: string;
  title: string;
  vote_average: number;
  id: number;
};

const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topRated, setTopRated] = useState([{} as TopMoviesData]);
  const [searchTopic, setSearchTopic] = useState<string>("movie");

  const getTopRated = async () => {
    //
    const topRatedUrl = `${movies_url}${searchTopic}/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    const response = await fetch(topRatedUrl);
    const data = await response.json();

    try {
      if (response.ok) {
        setTopRated(data.results);
        // console.log(data);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      if (error) {
        alert(error.message);
      }
    }
  };

  const handleClick = (event: any) => {
    const value = event.target.attributes[0].value;
    setSearchTopic(value);
  };

  useEffect(() => {
    getTopRated();
  }, []);

  useEffect(() => {
    getTopRated();
  }, [searchTopic]);

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
                <li>
                  <button onClick={handleClick} data-value="tv">
                    Na TV
                  </button>
                </li>
                <li>
                  <button onClick={handleClick} data-value="movie">
                    Nos Cinemas
                  </button>
                </li>
              </ul>
            </div>
            <div id="card_list">
              <ul>
                {topRated &&
                  topRated.map((movie, index) => {
                    return (
                      <Card
                        key={index}
                        url_image={movie.backdrop_path}
                        title={movie.title}
                        vote_average={movie.vote_average}
                        id_movie={movie.id}
                      />
                    );
                  })}
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
