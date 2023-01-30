// Function - Native
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

// .env
import { api_key, api_url_default } from "../index";

// TS
import { TopMoviesData } from "../index";
import { WantedDataProps } from "../procurando/[name]";

const CategoryPage = ({ dataTopRated }: { dataTopRated: WantedDataProps }) => {
  // React

  const [searchedCategory, setSearchedCategory] = useState([
    {} as TopMoviesData,
  ]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  // Router
  const router = useRouter();

  const checkData = async (dataTopRated: WantedDataProps) => {
    if (dataTopRated?.error) {
      setIsLoading(false);

      return setAlertMessage(dataTopRated.message);
    }

    setSearchedCategory(dataTopRated.results);
    setTotalPages(dataTopRated.total_pages);

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    checkData(dataTopRated);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    checkData(dataTopRated);
  }, [router.query.category]);

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
