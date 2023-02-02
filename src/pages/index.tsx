// Functions - Native
import Head from "next/head";
import { useEffect, useState } from "react";

// Functions - utils
import { fetchData } from "@/utils/fetchData";

// Component
import { AlertMessage, Card, InputText, Loading } from "@/components";

// CSS
import styles from "../styles/Home.module.css";

// TS
import { Carousel, CarouselProps } from "@/components/Carousel";

export type TopMoviesData = {
  media_type: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  release_date: string;
  video: boolean;
};
export type DataProps = {
  results: TopMoviesData[];
  error?: boolean;
  message?: string;
};

export const api_url_default =
  process.env.API_URL_DEFAULT || process.env.PRODUCTION_API_URL_DEFAULT;
export const api_key = process.env.API_KEY || process.env.PRODUCTION_API_KEY;

export default function Home({
  dataTopRatedMovie,
  dataTopRatedSerie,
}: {
  dataTopRatedMovie: DataProps;
  dataTopRatedSerie: DataProps;
}) {
  const [topRatedMovies, setTopRatedMovies] = useState([{} as TopMoviesData]);
  const [topRatedSeries, setTopRatedSeries] = useState([{} as TopMoviesData]);
  const [propsCarousel, setPropsCarousel] = useState({} as CarouselProps);
  const [counter, setCounter] = useState<number>(5);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>();

  const checkDatas = (dataMovie: DataProps, dataSeries: DataProps) => {
    //
    if (dataMovie.error || dataSeries.error) {
      setIsLoading(false);

      return setAlertMessage(dataMovie.message || dataSeries.message);
    }

    setTopRatedMovies(dataMovie.results);
    setTopRatedSeries(dataSeries.results);

    setPropsCarousel({
      title: dataMovie.results[index]?.title || dataMovie.results[index]?.name,
      release_date: dataMovie.results[index]?.release_date,
      background_url:
        dataMovie.results[index]?.backdrop_path ||
        dataMovie.results[index]?.poster_path,
      id_movie: dataMovie.results[index].id,
    });
    countDown();
    setIsLoading(false);
  };

  //

  const countDown = () => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      setPropsCarousel({
        title: topRatedMovies[index]?.title || topRatedMovies[index]?.name,
        release_date: topRatedMovies[index]?.release_date,
        background_url:
          topRatedMovies[index]?.backdrop_path ||
          topRatedMovies[index]?.poster_path,
        id_movie: topRatedMovies[index].id,
      });

      if (index === topRatedMovies.length - 1) {
        setIndex(0);
      } else {
        setIndex((prevState) => prevState + 1);
      }
      setCounter(5);
    }
  };

  useEffect(() => {
    checkDatas(dataTopRatedMovie, dataTopRatedSerie);
  }, []);

  useEffect(() => {
    countDown();
  }, [counter]);

  return (
    <>
      <Head>
        <title>MaikãoFlix</title>
        <meta name="description" content="Maikaoflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* ERROR */}
        {!isLoading && alertMessage && (
          <AlertMessage alertMessage={alertMessage} backTo="Recarregar" />
        )}
        {/* ERROR */}
        {isLoading && <Loading />}

        {/* HEADER */}
        {!isLoading && !alertMessage && (
          <>
            <div className={styles.header}>
              <section className={styles.carousel_section}>
                {topRatedMovies && <Carousel data={propsCarousel} />}
              </section>
              <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
              <InputText />
            </div>
            <section className={styles.section_card_list}>
              <h2>As melhores séries de TV</h2>
              <div className={styles.list}>
                <>{topRatedSeries && <Card dataCard={topRatedSeries} />}</>
              </div>
            </section>
          </>
        )}

        {/* HEADER */}

        {/* MAIN */}
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const topRatedMovieUrl = `${api_url_default}movie/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;
  const topRatedSerieUrl = `${api_url_default}tv/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

  const dataTopRatedMovie = await fetchData(topRatedMovieUrl);
  const dataTopRatedSerie = await fetchData(topRatedSerieUrl);
  console.log(dataTopRatedMovie.results[0]);

  return {
    props: { dataTopRatedMovie, dataTopRatedSerie },
  };
}
