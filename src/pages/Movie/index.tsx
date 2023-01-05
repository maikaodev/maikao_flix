import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Details } from "../../components";

const movies_url = import.meta.env.VITE_API_URL_DEFAULT;
const api_key = import.meta.env.VITE_API_KEY;

type DetailsData = {
  title: string;
  poster_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  overview: string;
};

const Movie = () => {
  //
  const [details, setDetails] = useState({} as DetailsData);

  let { id } = useParams();

  const getDetailsMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    try {
      if (response.ok) {
        setDetails(data);
        console.log("[MOVIE]====>", data);
      } else {
        throw new Error("Ocorreu um erro inesperado!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const detailsURL = `${movies_url}${id}?${api_key}&language=pt-BR&page=1&region=BR`;

    getDetailsMovies(detailsURL);
  }, []);

  return (
    <section>
      <Details
        title={details.title}
        background_img={details.poster_path}
        budget={details.budget}
        revenue={details.revenue}
        runTime={details.runtime}
        overView={details.overview}
      />
    </section>
  );
};

export default Movie;
