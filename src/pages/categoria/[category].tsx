// Function - Native
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Function - Utils
import { fetchData } from "@/utils/fetchData";

// Components
import { Pagination } from "antd";
import { AlertMessage, Card, Loading } from "../../components";

// CSS
import S from "../../styles/Category.module.css";
import styles from "../../styles/Home.module.css";

// .env
import { api_key, api_url_default } from "../index";

// TS
import { DataProps as TopRated, ResultsProps } from "@/types/pages";

const CategoryPage = ({ dataTopRated }: { dataTopRated: TopRated }) => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as ResultsProps,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const checkData = async (dataTopRated: TopRated) => {
    if (dataTopRated?.error) {
      setIsLoading(false);

      return setAlertMessage(dataTopRated.message);
    }

    setSearchedCategory(dataTopRated.results);
    setTotalPages(dataTopRated.total_pages!);

    setIsLoading(false);
  };

  useEffect(() => {
    checkData(dataTopRated);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    checkData(dataTopRated);
  }, [router.query.category]);

  return (
    <main>
      <Head>
        <title>MaikãoFlix | Categoria </title>
        <meta name="description" content="Maikaoflix | Categoria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loading />}
      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} />
      )}
      {!isLoading && !alertMessage && (
        <section className={S.content}>
          {!isLoading && searchedCategory && (
            <>
              <section className={styles.section_card_list}>
                <div className={styles.list} data-testid="card">
                  {searchedCategory && <Card dataCard={searchedCategory} />}
                </div>
              </section>
              {totalPages > 1 && (
                <div className={S.pagination}>
                  <Pagination
                    data-testid="pagination"
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
export async function getServerSideProps({
  query,
}: {
  query: { category: string; page: string };
}) {
  let category: string;

  if (query.category === "filmes") {
    category = "movie";
  } else {
    category = "tv";
  }

  const topRatedUrl = `${api_url_default}${category}/top_rated?${api_key}&language=pt-BR&page=${query.page}&region=BR`;
  const dataTopRated = await fetchData(topRatedUrl);

  return {
    props: { dataTopRated },
  };
}

export default CategoryPage;
