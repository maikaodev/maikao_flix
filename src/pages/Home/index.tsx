import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Card } from "../../components";

import "./style.css";

const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

type data = {
  [key: string]: string;
  url_image: string;
  title: string;
};

const Home = () => {
  const [topMovies, setTopMovies] = useState([{} as data]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getTopRatedMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      if (response.ok) {
        setTopMovies(data.results);
        setTotalPages(data.total_pages);
        console.log(data);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const pagination = (page: number) => {
    const nextPageTopRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR&page=${page}&region=BR`;
    getTopRatedMovies(nextPageTopRatedUrl);
  };

  useEffect(() => {
    const topRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <section className="container">
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
      <div id="pagination">
        <Pagination
          defaultCurrent={1}
          total={totalPages}
          onChange={(event) => {
            pagination(event);
          }}
        />
      </div>
    </section>
  );
};

export default Home;
