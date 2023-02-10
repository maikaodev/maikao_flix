import "@testing-library/jest-dom/extend-expect";
import { render, within } from "@testing-library/react";
// import mockRouter from "next-router-mock";

// Page
import Home from "@/pages/index";

// TS
import { DataProps as ResultProps } from "@/types/pages";

// Functions - utils
import { fetchData } from "../../../src/utils/fetchData";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

describe("Home page", () => {
  //
  describe("Good request", () => {
    let dataTopRatedMovie: ResultProps;
    let dataTopRatedSerie: ResultProps;

    beforeEach(async () => {
      const topRatedMovieUrl = "https://api.themoviedb.org/3/movie/top_rated";
      const topRatedSerieUrl = "https://api.themoviedb.org/3/tv/top_rated";

      dataTopRatedMovie = await fetchData(topRatedMovieUrl);
      dataTopRatedSerie = await fetchData(topRatedSerieUrl);
    });
    //
    it("should have a carousel component", async () => {
      //
      const { getByTestId } = render(
        <Home
          dataTopRatedMovie={dataTopRatedMovie}
          dataTopRatedSerie={dataTopRatedSerie}
        />
      );

      const carousel = getByTestId("carousel");

      expect(carousel).toBeInTheDocument();
    });

    it("should have a card component", async () => {
      //
      const { getByTestId } = render(
        <Home
          dataTopRatedMovie={dataTopRatedMovie}
          dataTopRatedSerie={dataTopRatedSerie}
        />
      );

      const card = getByTestId("card");

      expect(card).toBeInTheDocument();
    });

    it("should render the same amout", async () => {
      //
      const { getByTestId } = render(
        <Home
          dataTopRatedMovie={dataTopRatedMovie}
          dataTopRatedSerie={dataTopRatedSerie}
        />
      );
      const card = getByTestId("card");
      const cardList = getByTestId("card_list");
      const itemsInCard = within(cardList).getAllByTestId("item_card_list");

      expect(card).toContainElement(cardList);
      expect(itemsInCard).toHaveLength(dataTopRatedSerie.results.length);
    });
  });

  //
  describe("Bad request", () => {
    let dataTopRatedMovie: ResultProps;
    let dataTopRatedSerie: ResultProps;

    beforeEach(async () => {
      const topRatedMovieUrl = "https://api.themoviedb.org/3/aaa/bbb";
      const topRatedSerieUrl = "https://api.themoviedb.org/3/ccc/ddd";

      dataTopRatedMovie = await fetchData(topRatedMovieUrl);
      dataTopRatedSerie = await fetchData(topRatedSerieUrl);
    });

    it("should have a alert component", async () => {
      //
      const { getByTestId } = render(
        <Home
          dataTopRatedMovie={dataTopRatedMovie}
          dataTopRatedSerie={dataTopRatedSerie}
        />
      );

      // Elements
      const alert = getByTestId("alert");
      const alertMessage = getByTestId("alert_message");
      const alertButton = getByTestId("alert_button");

      // Assertions
      expect(alert).toBeInTheDocument();
      expect(alertMessage).toHaveTextContent(
        "Desculpe, ocorreu um erro inesperado!"
      );
      expect(alertButton).toHaveTextContent("Recarregar");
      expect(alertButton).toBeEnabled();
    });
  });
});
