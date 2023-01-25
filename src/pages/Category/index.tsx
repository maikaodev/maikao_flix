// Function - Native
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

// Function - Utils
import { fetchData } from "@/utils/fetchData";

// Components
import { Pagination } from "antd";
import { AlertMessage, Card, Loading } from "../../components";

// CSs
import "./style.css";

// .env
const movies_url_default = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

// TS
import { TopMoviesData } from "../Home";

const CategoryPage = () => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // React router
  let { category } = useParams();
  const [currentPage, setCurrentPage] = useSearchParams();

  const getTheMostRated = async () => {
    setIsLoading(true);

    let theme: string;

    if (category === "filmes") {
      theme = "movie";
    } else {
      theme = "tv";
    }

    const topRatedUrl = `${movies_url_default}${theme}/top_rated?${api_key}&language=pt-BR&page=${currentPage.get(
      "page"
    )}&region=BR`;

    const data = await fetchData(topRatedUrl);

    if (data?.error) {
      setIsLoading(false);

      return setAlertMessage(data.message);
    }

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
    getTheMostRated();
  }, []);

  useEffect(() => {
    getTheMostRated();
  }, [category, currentPage.get("page")]);

  return (
    <main>
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!isLoading && !alertMessage && (
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
      )}
    </main>
  );
};
export default CategoryPage;
