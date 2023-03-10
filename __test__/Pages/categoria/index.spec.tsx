import "@testing-library/jest-dom/extend-expect";
import { render, within } from "@testing-library/react";
import mockRouter from "next-router-mock";

// Page
import Category from "@/pages/categoria/[category]";

// TS
import { DataProps as TopRated } from "@/types/pages";

// Functions - utils
import { fetchData } from "../../../src/utils/fetchData";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

describe("Category page", () => {
  //

  describe("Good request", () => {
    //
    let topRatedData: TopRated;

    beforeEach(async () => {
      //
      const url = "https://api.themoviedb.org/3/movie/top_rated";

      topRatedData = await fetchData(url);

      // Passing the page parameter to the pagination component
      mockRouter.push("/categoria/series?page=1");
    });

    // Configuring to test antd component
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    //
    it("should have a card component", async () => {
      //
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      // Element
      const card = getByTestId("card");

      // Assertion
      expect(card).toBeInTheDocument();
    });

    it("should have a pagination component", async () => {
      //

      // Render
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      // Element
      const pagination = getByTestId("pagination");

      // Assertion
      expect(pagination).toBeInTheDocument();
    });

    it("should render the same amout", async () => {
      //
      const { getByTestId } = render(<Category dataTopRated={topRatedData} />);

      // Elements
      const card = getByTestId("card");
      const cardList = getByTestId("card_list");
      const itemsInCard = within(cardList).getAllByTestId("item_card_list");

      // Assertions
      expect(card).toContainElement(cardList);
      expect(itemsInCard).toHaveLength(topRatedData.results.length);
    });

    describe("Bad request", () => {
      //
      let topRatedDataNotFound: TopRated;
      let topRatedBadReq: TopRated;

      beforeEach(async () => {
        //
        const url = "https://api.themoviedb.org/3/movie/top_rated_not_found";
        const badReqUrl = "https://api.themoviedb.org/3/aaa/bbb";

        topRatedDataNotFound = await fetchData(url);
        topRatedBadReq = await fetchData(badReqUrl);

        // Passing the page parameter to the pagination component
        mockRouter.push("/categoria/series?page=1");
      });

      // Configuring to test antd component
      beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
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

        // Elements
        const alertMessage = getByTestId("alert_message");
        const buttonMessage = getByTestId("alert_button");

        // Assertions
        expect(alertMessage).toHaveTextContent("Nada foi encontrado...");
        expect(buttonMessage).toHaveTextContent("P??gina Inicial");
      });

      it.only("Should have an alert : Sorry, an unexpected error occurred", async () => {
        //
        const { getByTestId } = render(
          <Category dataTopRated={topRatedBadReq} />
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
        expect(alertButton).toHaveTextContent("P??gina Inicial");
        expect(alertButton).toBeEnabled();
      });
    });
  });
});
