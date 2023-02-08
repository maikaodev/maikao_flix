import "@testing-library/jest-dom/extend-expect";
// import mockRouter from "next-router-mock";

// .env

// Functions - utils
import { fetchData } from "../../../src/utils/fetchData";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

describe("Home page", () => {
  //
  it("should have a navigation menu", async () => {
    const topRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated";
    const topRatedSerieUrl = "https://api.themoviedb.org/3/tv/top_rated";

    const dataTopRatedMovie = await fetchData(topRatedMovieUrl);
    const dataTopRatedSerie = await fetchData(topRatedSerieUrl);

    // const { getByRole } = render(
    //   <Home
    //     dataTopRatedMovie={dataTopRatedMovie}
    //     dataTopRatedSerie={dataTopRatedSerie}
    //   />
    // );
    console.log("[dataTopRatedMovie]==> ", dataTopRatedMovie);
    console.log("[dataTopRatedSerie]==> ", dataTopRatedSerie);
  });
});
