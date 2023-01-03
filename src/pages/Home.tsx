import { useEffect, useState } from "react";

import { Card } from "../components";

const movies_url = import.meta.env.VITE_API_URL;
const api_key = import.meta.env.VITE_API_KEY;

type data = {
  [key: string]: string;
  url_image: string;
  title: string;
};

const Home = () => {
  const [topMovies, setTopMovies] = useState([{} as data]);

  const getTopRatedMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      if (response.ok) {
        setTopMovies(data.results);
        console.log(data.results);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <ul>
      {topMovies &&
        topMovies.map((movie, index) => {
          return (
            <Card
              key={index}
              url_image={movie.backdrop_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
    </ul>
  );
};

export default Home;
