import "@testing-library/jest-dom/extend-expect";
import { render, within } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Category from "@/pages/categoria/[category]";

import { DataProps as TopRated } from "@/types/pages";

import { fetchData } from "../../../src/utils/fetchData";

jest.mock("next/router", () => require("next-router-mock"));

describe("Category page", () => {
  describe("Good request", () => {
    let topRatedData: TopRated;

    beforeEach(async () => {
      const url = "https://api.themoviedb.org/3/movie/top_rated";

      topRatedData = await fetchData(url);

      mockRouter.push("/categoria/series?page=1");
    });

    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    it("should have a card component", async () => {
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      const card = getByTestId("card");

      expect(card).toBeInTheDocument();
    });

    it("should have a pagination component", async () => {
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      const pagination = getByTestId("pagination");

      expect(pagination).toBeInTheDocument();
    });

    it("should render the same amout", async () => {
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      const card = getByTestId("card");
      const cardList = getByTestId("card_list");
      const itemsInCard = within(cardList).getAllByTestId("item_card_list");

      expect(card).toContainElement(cardList);
      expect(itemsInCard).toHaveLength(topRatedData.results.length);
    });

    describe("Bad request", () => {
      let topRatedDataNotFound: TopRated;
      let topRatedBadReq: TopRated;

      beforeEach(async () => {
        const url = "https://api.themoviedb.org/3/movie/top_rated_not_found";
        const badReqUrl = "https://api.themoviedb.org/3/aaa/bbb";

        topRatedDataNotFound = await fetchData(url);
        topRatedBadReq = await fetchData(badReqUrl);

        mockRouter.push("/categoria/series?page=1");
      });

      beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      });

      it("Should have an alert : Nothing Found", async () => {
        const { getByTestId } = render(
          <Category dataTopRated={topRatedDataNotFound} />
        );

        const alertMessage = getByTestId("alert_message");
        const buttonMessage = getByTestId("alert_button");

        expect(alertMessage).toHaveTextContent("Nada foi encontrado...");
        expect(buttonMessage).toHaveTextContent("Página Inicial");
      });

      it.only("Should have an alert : Sorry, an unexpected error occurred", async () => {
        const { getByTestId } = render(
          <Category dataTopRated={topRatedBadReq} />
        );

        const alert = getByTestId("alert");
        const alertMessage = getByTestId("alert_message");
        const alertButton = getByTestId("alert_button");

        expect(alert).toBeInTheDocument();
        expect(alertMessage).toHaveTextContent(
          "Desculpe, ocorreu um erro inesperado!"
        );
        expect(alertButton).toHaveTextContent("Página Inicial");
        expect(alertButton).toBeEnabled();
      });
    });
  });
});
