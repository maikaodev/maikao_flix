// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("/user", (req, res) => {
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
