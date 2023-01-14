import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Card, Loading } from "../../components";

import "./style.css";

const movies_url_default = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

type FilmResearchedData = {
  name: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  id: number;
};

const Search = () => {
  // React

  const [filmResearched, setFilmResearched] = useState([
    {} as FilmResearchedData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // React router
  let { name } = useParams();
  const [currentPage, setCurrentPage] = useSearchParams();

  const getTopRatedMovies = async () => {
    setIsLoading(true);

    const movies = `${movies_url_default}search/multi?${api_key}&language=pt-BR&query=${name}&page=${currentPage.get(
      "page"
    )}&include_adult=false&region=BR`;

    const response = await fetch(movies);
    const data = await response.json();

    try {
      if (response.ok) {
        setFilmResearched(data.results);
        setTotalPages(data.total_pages);
        console.log(data.results);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      if (error) {
        alert(error.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentPage.get("page")) {
      const current_page = {
        page: "1",
      };
      setCurrentPage(current_page);
    }
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    getTopRatedMovies();
  }, [name, currentPage.get("page")]);

  return (
    <section className="content">
      {isLoading && <Loading />}
      {!isLoading && filmResearched && (
        <>
          {totalPages > 1 && (
            <div id="pagination">
              <Pagination
                defaultCurrent={Number(currentPage.get("page"))}
                current={Number(currentPage.get("page"))}
                total={totalPages * 10}
                onChange={(event) => {
                  //
                  const current_page = {
                    page: event.toString(),
                  };

                  setCurrentPage(current_page);
                }}
              />
            </div>
          )}
          <ul>
            {filmResearched &&
              filmResearched.map((movie, index) => {
                return (
                  <Card
                    key={index}
                    url_image={
                      movie.backdrop_path
                        ? movie.backdrop_path
                        : movie.poster_path
                    }
                    title={movie.title || movie.name}
                    vote_average={movie.vote_average}
                    id_movie={movie.id}
                  />
                );
              })}
          </ul>
          {totalPages > 1 && (
            <div id="pagination">
              <Pagination
                defaultCurrent={Number(currentPage.get("page"))}
                current={Number(currentPage.get("page"))}
                total={totalPages * 10}
                onChange={(event) => {
                  //
                  const current_page = {
                    page: event.toString(),
                  };

                  setCurrentPage(current_page);
                }}
              />
            </div>
          )}
        </>
      )}
      {filmResearched.length === 0 && (
        <>
          <div id="nothingToSeeHere">
            <h1>Filme não encontrado...</h1>
            <Link to="/">Voltar para página principal</Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
