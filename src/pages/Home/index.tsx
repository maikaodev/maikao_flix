// Functions - Native
import { useEffect, useState } from "react";

// Functions - utils
import { fetchData } from "@/utils/fetchData";

// Component
import { Carousel, InputText, Loading } from "@/components";

// CSS
import "./style.css";

// TypeScript
import { CarouselProps } from "@/components/Carousel";

export type TopMoviesData = {
  media_type: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  release_date: string;
};

const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topRated, setTopRated] = useState([{} as TopMoviesData]);
  const [propsCarousel, setPropsCarousel] = useState({} as CarouselProps);
  const [counter, setCounter] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTopRated = async () => {
    //
    const topRatedUrl = `${movies_url}movie/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(topRatedUrl);

    setTopRated(data.results);
    console.log(topRated[index]?.title || topRated[index]?.name);

    setPropsCarousel({
      title: data.results[index]?.title || data.results[index]?.name,
      release_date: data.results[index]?.release_date,
      background_url:
        data.results[index]?.backdrop_path || data.results[index]?.poster_path,
      id_movie: data.results[index].id,
    });

    setIsLoading(false);
  };
  const countDown = () => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    console.log("[COUNTER]", counter);
    console.log("[INDEX]", index);

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
    getTopRated();
  }, []);

  useEffect(() => {
    countDown();
  }, [counter]);
  return (
    <main id="container">
      {/* HEADER */}
      {!isLoading && (
        <div id="header">
          <section id="carousel_section">
            {topRated && <Carousel data={propsCarousel} />}
          </section>
          <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
          <InputText />
        </div>
      )}
      {isLoading && <Loading />}
      {/* HEADER */}

      {/* MAIN */}
    </main>
  );
};

export default Home;
