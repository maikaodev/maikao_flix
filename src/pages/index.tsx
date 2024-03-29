import Head from "next/head";
import { useEffect, useState } from "react";

import { fetchData } from "@/utils/fetchData";

import { AlertMessage, Card, InputText, Loading } from "@/components";
import { Carousel } from "@/components/Carousel";

import styles from "../styles/Home.module.css";

import { CarouselProps } from "@/types/components";
import { DataProps as TopRatedProps, ResultsProps } from "@/types/pages";

export const api_url_default =
  process.env.API_URL_DEFAULT || process.env.PRODUCTION_API_URL_DEFAULT;
export const api_key = process.env.API_KEY || process.env.PRODUCTION_API_KEY;

export default function Home({
  dataTopRatedMovie,
  dataTopRatedSerie,
}: {
  dataTopRatedMovie: TopRatedProps;
  dataTopRatedSerie: TopRatedProps;
}) {
  const [topRatedMovies, setTopRatedMovies] = useState([{} as ResultsProps]);
  const [topRatedSeries, setTopRatedSeries] = useState([{} as ResultsProps]);
  const [propsCarousel, setPropsCarousel] = useState({} as CarouselProps);
  const [counter, setCounter] = useState<number>(5);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>();

  const checkDatas = (dataMovie: TopRatedProps, dataSeries: TopRatedProps) => {
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

      {!isLoading && alertMessage && (
        <AlertMessage alertMessage={alertMessage} backTo="Recarregar" />
      )}

      {isLoading && <Loading />}

      {!isLoading && !alertMessage && (
        <>
          <div className={styles.header}>
            <section className={styles.carousel_section} data-testid="carousel">
              {topRatedMovies && <Carousel data={propsCarousel} />}
            </section>
            <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
            <InputText />
          </div>
          <section className={styles.section_card_list}>
            <h2>As melhores séries de TV</h2>
            <div className={styles.list} data-testid="card">
              <>{topRatedSeries && <Card dataCard={topRatedSeries} />}</>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export async function getServerSideProps() {
  const topRatedMovieUrl = `${api_url_default}movie/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;
  const topRatedSerieUrl = `${api_url_default}tv/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

  const dataTopRatedMovie = await fetchData(topRatedMovieUrl);
  const dataTopRatedSerie = await fetchData(topRatedSerieUrl);

  return {
    props: { dataTopRatedMovie, dataTopRatedSerie },
  };
}
