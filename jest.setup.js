import "@testing-library/jest-dom";
import "unfetch/polyfill";
// src/setupTests.js
import { server } from "./__test__/mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
