import { fetchData } from "@/utils/fetchData";
import { Pagination } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Link, useParams, useSearchParams } from "react-router-dom";
import { AlertMessage, Card, Loading } from "../components";

import styles from "../../styles/Search.module.css";

const movies_url_default = process.env.API_URL_DEFAULT;
const api_key = process.env.API_KEY;

import { TopMoviesData } from "./index";

const Search = () => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // React router
  let router = useRouter();
  // TODO: Alterar os parametros das rotas usando next link
  // const [currentPage, setCurrentPage] = useSearchParams();

  const getTheMostRated = async () => {
    setIsLoading(true);

    const movies = `${movies_url_default}search/multi?${api_key}&language=pt-BR&query=${router.query.name}&page=${router.query.page}&include_adult=false&region=BR`;

    const data = await fetchData(movies);

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
      router.push({
        query: { page: 1 },
      });
    }
    getTheMostRated();
  });

  return (
    <main>
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!alertMessage && (
        <section className={styles.content}>
          {isLoading && <Loading />}
          {!isLoading && searchedCategory && (
            <>
              <section className={styles.searchedCategory}>
                <ul className={styles.card_list}>
                  {searchedCategory && <Card dataCard={searchedCategory} />}
                </ul>
              </section>
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Pagination
                    simple
                    defaultCurrent={Number(router.query.page)}
                    current={Number(router.query.page)}
                    total={totalPages * 10}
                    // TODO: TS
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
              <div className={styles.nothingToSeeHere}>
                <h1>Filme não encontrado...</h1>
                <Link href="/">Voltar para página principal</Link>
              </div>
            </>
          )}
          {!isLoading && alertMessage && (
            <AlertMessage alertMessage={alertMessage} />
          )}
        </section>
      )}
    </main>
  );
};

export default Search;
