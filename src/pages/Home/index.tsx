import { Card } from "@/components";
import { useEffect, useState } from "react";
import "./style.css";

import { InputText } from "@/components/InputText";
import { fetchData } from "@/utils/fetchData";

export type TopMoviesData = {
  media_type: string;
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

    const data = await fetchData(topRatedUrl);

    setTopRated(data.results);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const value:HTMLButtonElement = event.target.attributes[0].value;
    const value: HTMLButtonElement = event.currentTarget;

    if (value.name === searchTopic) return;

    setSearchTopic(value.name);
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
      <div id="header">
        <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
        <InputText />
      </div>
      {/* HEADER */}

      {/* CONTENT */}
      <section id="overview_top_rated">
        <div>
          <h2>Os mais populares</h2>
          <ul id="nav">
            <li>
              <button onClick={handleClick} name="tv">
                Na TV
              </button>
            </li>
            <li>
              <button onClick={handleClick} name="movie">
                Nos Cinemas
              </button>
            </li>
          </ul>
        </div>
        <ul id="card_list">
          {topRated &&
            topRated.map((movie, index) => {
              return (
                <Card
                  key={index}
                  url_image={movie.backdrop_path || movie.poster_path}
                  title={movie.title || movie.name}
                  vote_average={movie.vote_average}
                  id_movie={movie.id}
                  search_topic={searchTopic || movie.media_type}
                />
              );
            })}
        </ul>
      </section>
      {/* MAIN */}
    </main>
  );
};

export default Home;
