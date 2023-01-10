import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Loading } from "../../components";

import "./style.css";

const movies_url_search = import.meta.env.VITE_API_URL_SEARCH;
const api_key = import.meta.env.VITE_API_KEY;

type TopMoviesData = {
  backdrop_path: string;
  title: string;
  vote_average: number;
  id: number;
};

const Search = () => {
  const [topMovies, setTopMovies] = useState([{} as TopMoviesData]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let { name } = useParams();

  const getTopRatedMovies = async () => {
    const movies = `${movies_url_search}/?${api_key}&language=pt-BR&query=${name}&include_adult=false&region=BR`;

    const response = await fetch(movies);
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
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTopRatedMovies();
  }, [name]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="container">
          <div id="pagination">
            <Pagination
              defaultCurrent={1}
              // current={Number(currentPage.get("page"))}
              total={totalPages}
              /*  onChange={(event) => {
                //
                const current_page = {
                  page: event.toString(),
                };

                setCurrentPage(current_page);
              }} */
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
        </section>
      )}
    </>
  );
};

export default Search;
