import { Card } from "@/components";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./style.css";

export type TopMoviesData = {
  name: string;
  backdrop_path: string;
  poster_path: string;
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
        console.log(data.results);
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

    if (value === searchTopic) return;

    setSearchTopic(value);
  };

  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { searching } = Object.fromEntries(formData.entries());

    if (searching === "") {
      alert("Insira um nome válido");
    }
    if (searching) {
      navigate(`/${searching}`);
    }
    input.current!.value = "";
  };

  useEffect(() => {
    getTopRated();
  }, []);

  useEffect(() => {
    getTopRated();
  }, [searchTopic]);

  return (
    <main id="container">
      {/* HEADER */}
      <header id="header">
        <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searching"
            placeholder="Buscar por um Filme ou Série..."
          />
          <button type="submit">
            <BiSearchAlt2 id="icon" />
          </button>
        </form>
      </header>
      {/* HEADER */}

      {/* CONTENT */}
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
                    url_image={movie.backdrop_path || movie.poster_path}
                    title={movie.title || movie.name}
                    vote_average={movie.vote_average}
                    id_movie={movie.id}
                    search_topic={searchTopic}
                  />
                );
              })}
          </ul>
        </div>
      </section>
      {/* MAIN */}
    </main>
  );
};

export default Home;
