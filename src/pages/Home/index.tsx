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

  const getTopRatedMovies = async () => {
    const topRatedUrl = `${movies_url}top_rated?${api_key}&language=pt-BR&page=${currentPage.get(
      "page"
    )}&region=BR`;

    const response = await fetch(topRatedUrl);
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

  useEffect(() => {
    //
    if (!currentPage.get("page")) {
      const current_page = {
        page: "1",
      };
      setCurrentPage(current_page);
    }
  }, []);

  useEffect(() => {
    getTopRatedMovies();
  }, [currentPage.get("page")]);

  console.log("RENDER");

  return (
    <section className="container">
      <div id="pagination">
        <Pagination
          defaultCurrent={1}
          current={Number(currentPage.get("page"))}
          total={totalPages}
          onChange={(event) => {
            //
            const current_page = {
              page: event.toString(),
            };

            setCurrentPage(current_page);
          }}
        />
      </div>
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
            //
            const current_page = {
              page: event.toString(),
            };

            setCurrentPage(current_page);
          }}
        />
      </div>
    </section>
  );
};

export default Home;
