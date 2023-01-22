import { fetchData } from "@/utils/fetchData";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Card, Loading } from "../../components";

import "./style.css";

const movies_url_default = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

import { TopMoviesData } from "../Home";

const Search = () => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
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

    const data = await fetchData(movies);
    setSearchedCategory(data.results);
    setTotalPages(data.total_pages);

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
    <main>
      <section className="content">
        {isLoading && <Loading />}
        {!isLoading && searchedCategory && (
          <>
            <section id="searchedCategory">
              <ul id="card_list">
                {searchedCategory && <Card dataCard={searchedCategory} />}
              </ul>
            </section>
            {totalPages > 1 && (
              <div id="pagination">
                <Pagination
                  simple
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
        {searchedCategory.length === 0 && (
          <>
            <div id="nothingToSeeHere">
              <h1>Filme não encontrado...</h1>
              <Link to="/">Voltar para página principal</Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Search;
