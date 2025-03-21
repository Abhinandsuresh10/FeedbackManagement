import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const handlers = [
  http.post("http://localhost:3000/api/register", () => {
    return HttpResponse.json(
      { message: "User registered successfully", userId: "123" },
      { status: 201 }
    );
  }),
  http.post('http://localhost:3000/api/login', () => {
    return HttpResponse.json(
      { message: 'User logged in successfully' },
      { status: 200 }
    );
  }),
];

export const server = setupServer(...handlers);
export default handlers;
