import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const handlers = [
  http.post("http://localhost:3000/api/register", () => {
    return HttpResponse.json(
      { message: "User registered successfully", userId: "123" },
      { status: 201 }
    );
  }),
];

export const server = setupServer(...handlers);