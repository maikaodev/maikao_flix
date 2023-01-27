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

const movies_url = process.env.API_URL_DEFAULT;
const api_key = process.env.API_KEY;

export default function Home() {
  const [topRated, setTopRated] = useState([{} as TopMoviesData]);
  const [topRatedTvSeries, setTopRatedTvSeries] = useState([
    {} as TopMoviesData,
  ]);
  const [propsCarousel, setPropsCarousel] = useState({} as CarouselProps);
  const [counter, setCounter] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>();

  const getTopRatedMovie = async () => {
    //
    const topRatedUrl = `${movies_url}movie/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(topRatedUrl);

    if (data?.error) {
      setIsLoading(false);

      return setAlertMessage(data.message);
    }

    setTopRated(data.results);

    setPropsCarousel({
      title: data.results[index]?.title || data.results[index]?.name,
      release_date: data.results[index]?.release_date,
      background_url:
        data.results[index]?.backdrop_path || data.results[index]?.poster_path,
      id_movie: data.results[index].id,
    });

    setIsLoading(false);
  };
  const getTopRatedTVSeries = async () => {
    //
    const topRatedUrl = `${movies_url}tv/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(topRatedUrl);

    setTopRatedTvSeries(data.results);
  };

  //

  const countDown = () => {
    if (counter > 0) {
    }
    setTimeout(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      setPropsCarousel({
        title: topRated[index]?.title || topRated[index]?.name,
        release_date: topRated[index]?.release_date,
        background_url:
          topRated[index]?.backdrop_path || topRated[index]?.poster_path,
        id_movie: topRated[index].id,
      });

      if (index === topRated.length - 1) {
        setIndex(0);
      } else {
        setIndex((prevState) => prevState + 1);
      }
      setCounter(5);
    }
  };

  useEffect(() => {
    getTopRatedMovie();
    getTopRatedTVSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    countDown();
  });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Maikaoflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="container">
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
                {topRated && <Carousel data={propsCarousel} />}
              </section>
              <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
              <InputText />
            </div>
            <section className={styles.section_card_list}>
              <h2>As melhores séries de TV</h2>
              <div className={styles.list}>
                <ul className={styles.card_list}>
                  {topRatedTvSeries && <Card dataCard={topRatedTvSeries} />}
                </ul>
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