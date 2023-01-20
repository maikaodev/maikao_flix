// Functions - Native
import { useEffect, useState } from "react";

// Functions - utils
import { fetchData } from "@/utils/fetchData";

// Component
import { Carousel, InputText } from "@/components";

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
  const [searchTopic, setSearchTopic] = useState<string>("movie");
  const [counter, setCounter] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const getTopRated = async () => {
    //
    const topRatedUrl = `${movies_url}${searchTopic}/top_rated?${api_key}&language=pt-BR&page=1&region=BR`;

    const data = await fetchData(topRatedUrl);

    setTopRated(data.results);
    setPropsCarousel({
      title: data.results[index]?.title || data.results[index]?.name,
      release_date: data.results[index]?.release_date,

      background_url:
        data.results[index]?.backdrop_path || data.results[index]?.poster_path,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value: HTMLButtonElement = event.currentTarget;

    if (value.name === searchTopic) return;

    setSearchTopic(value.name);
  };

  useEffect(() => {
    getTopRated();
  }, []);

  useEffect(() => {
    getTopRated();
  }, [searchTopic]);

  const countDown = () => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      setPropsCarousel({
        title: topRated[index]?.title || topRated[index]?.name,
        release_date: topRated[index]?.release_date,

        background_url:
          topRated[index]?.backdrop_path || topRated[index]?.poster_path,
      });

      if (index === topRated.length) {
        setIndex(0);
      } else {
        setIndex((prevState) => prevState + 1);
      }
      setCounter(5);
    }
  };

  useEffect(() => {
    countDown();
  }, [counter]);
  return (
    <main id="container">
      {/* HEADER */}
      <div id="header">
        <h2>Milhares de filmes, séries para descobrir. Explore já!</h2>
        <InputText />
      </div>
      {/* HEADER */}

      {/* CONTENT */}
      <section id="overview_top_rated">
        <h2>Os mais populares</h2>
        {/* <div>
          <ul id="nav">
            <li>
              <button onClick={handleClick} name="tv">
                Na TV
              </button>
            </li>
            <li>
              <button onClick={handleClick} name="movie">
                Nos Cinemas
              </button>
            </li>
          </ul>
        </div>  */}
      </section>

      <section id="carousel_section">
        {topRated && <Carousel data={propsCarousel} />}
      </section>
      {/* MAIN */}
    </main>
  );
};

export default Home;
