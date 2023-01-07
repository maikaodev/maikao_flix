import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components";

import "./style.css";

const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

type TopMoviesData = {
  backdrop_path: string;
  title: string;
  vote_average: number;
  id: number;
};

const Home = () => {
  const [topMovies, setTopMovies] = useState([{} as TopMoviesData]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useSearchParams();

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
      if (error) {
        alert(error.message);
      }
    }
  };

  const pagination = (page: number) => {
    const nextPageTopRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR&page=${page}&region=BR`;

    const current_page = {
      page: page.toString(),
    };

    setCurrentPage(current_page);

    getTopRatedMovies(nextPageTopRatedUrl);
  };

  useEffect(() => {
    const topRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR&page=${currentPage.get(
      "page"
    )}&region=BR`;

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
                id_movie={movie.id}
              />
            );
          })}
      </ul>
      <div id="pagination">
        <Pagination
          defaultCurrent={1}
          current={Number(currentPage.get("page"))}
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
