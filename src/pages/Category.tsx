// Function - Native
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Function - Utils
import { fetchData } from "@/utils/fetchData";

// Components
import { Pagination } from "antd";
import { AlertMessage, Card, Loading } from "../components";

// CSs
import S from "../../styles/Category.module.css";

// .env
const movies_url_default = process.env.VITE_API_URL_DEFAULT;
const api_key = process.env.VITE_API_KEY;

// TS
import Link from "next/link";
import { TopMoviesData } from "./index";

const CategoryPage = () => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useSearchParams();

  const getTheMostRated = async () => {
    setIsLoading(true);

    let theme: string;

    if (router.query.category === "filmes") {
      theme = "movie";
    } else {
      theme = "tv";
    }

    const topRatedUrl = `${movies_url_default}${theme}/top_rated?${api_key}&language=pt-BR&page=${router.query.page}&region=BR`;

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
    if (!router.query.page) {
      if (!router.query.page) {
        router.push({
          query: { page: 1 },
        });
      }
    }
    getTheMostRated();
  });

  return (
    <main>
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!isLoading && !alertMessage && (
        <section className={S.content}>
          {isLoading && <Loading />}
          {!isLoading && searchedCategory && (
            <>
              <section className={S.searchedCategory}>
                <ul className={S.card_list}>
                  {searchedCategory && <Card dataCard={searchedCategory} />}
                </ul>
              </section>
              {totalPages > 1 && (
                <div className={S.pagination}>
                  <Pagination
                    simple
                    defaultCurrent={Number(router.query.page)}
                    current={Number(router.query.page)}
                    total={totalPages * 10}
                    onChange={(event) => {
                      //
                      router.push({
                        query: { page: event.toString() },
                      });
                    }}
                  />
                </div>
              )}
            </>
          )}
          {searchedCategory.length === 0 && (
            <>
              <div className={S.nothingToSeeHere}>
                <h1>Filme não encontrado...</h1>
                <Link href="/">Voltar para página principal</Link>
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
};
export default CategoryPage;
