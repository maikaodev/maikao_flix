import "@testing-library/jest-dom/extend-expect";
import { render, within } from "@testing-library/react";
import mockRouter from "next-router-mock";

// Page
import Search from "@/pages/procurando/[name]";

// TS
import { DataProps as WantedDataProps } from "@/types/pages";

// Functions - utils
import { fetchData } from "../../../src/utils/fetchData";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

describe("Search page", () => {
  //

  describe("Good request", () => {
    let wantedData: WantedDataProps;

    beforeEach(async () => {
      const url = "https://api.themoviedb.org/3/search/multi/batman";

      wantedData = await fetchData(url);

      // Passing the page parameter to the pagination component
      mockRouter.push("/procurando/batman?page=1");
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

    it("should have a card component", async () => {
      //
      const { getByTestId } = render(<Search wantedData={wantedData} />);

      // Element
      const card = getByTestId("card");

      // Assertion
      expect(card).toBeInTheDocument();
    });

    it("should have a pagination component", async () => {
      //

      // Render
      const { getByTestId } = render(<Search wantedData={wantedData} />);

      // Element
      const pagination = getByTestId("pagination");

      // Assertion
      expect(pagination).toBeInTheDocument();
    });

    it("should render the same amout", async () => {
      //
      const { getByTestId } = render(<Search wantedData={wantedData} />);

      // Elements
      const card = getByTestId("card");
      const cardList = getByTestId("card_list");
      const itemsInCard = within(cardList).getAllByTestId("item_card_list");

      // Assertions
      expect(card).toContainElement(cardList);
      expect(itemsInCard).toHaveLength(wantedData.results.length);
    });
  });

  describe("Bad request", () => {
    //

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

    it.only("should have an alert component when the error is internal", async () => {
      mockRouter.push("/procurando/batman?page=1");

      let wantedData: WantedDataProps;

      const url = "https://api.themoviedb.org/3/";

      wantedData = await fetchData(url);

      //
      const { getByTestId } = render(<Search wantedData={wantedData} />);

      // Elements
      const alert = getByTestId("alert");
      const alertIcon = getByTestId("alert_icon");
      const alertMessage = getByTestId("alert_message");
      const alertButton = getByTestId("alert_button");

      // Assertions
      expect(alert).toBeInTheDocument();
      expect(alertIcon).toBeInTheDocument();
      expect(alertMessage).toHaveTextContent(
        "Desculpe, ocorreu um erro inesperado!"
      );
      expect(alertButton).toHaveTextContent("Página Inicial");
      expect(alertButton).toBeEnabled();
    });

    it.only("should have an alert component when the request isn't found", async () => {
      // mockRouter.push("/procurando/12231223123?page=1");

      let wantedDataNotFound: WantedDataProps;
      const urlDataNotFound =
        "https://api.themoviedb.org/3/search/multi/12231223123";

      wantedDataNotFound = await fetchData(urlDataNotFound);

      //
      const { getByTestId } = render(
        <Search wantedData={wantedDataNotFound} />
      );

      // Elements
      const alert = getByTestId("alert");
      const alertMessage = getByTestId("alert_message");
      const alertButton = getByTestId("alert_button");

      // Assertions
      expect(alert).toBeInTheDocument();
      expect(alertMessage).toHaveTextContent("Filme não encontrado...");
      expect(alertButton).toHaveTextContent("Página Inicial");
    });
  });
});
