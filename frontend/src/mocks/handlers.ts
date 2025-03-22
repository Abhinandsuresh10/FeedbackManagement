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
  http.post('http://localhost:3000/api/feedback', () => {
    return HttpResponse.json(
      { message: 'Feedback submitted successfully' },
      { status: 200 }
    );
  }),
  http.get('http://localhost:3000/api/getFeedbacks', () => {
    return new HttpResponse(
      JSON.stringify([
        {
          _id: '67dcf4e1b3da7cd1dbd6a541',
          userId: 17,
          message: [
            'this seems a good app i love it',
            'i want new applications like this',
            'hi todays new feedback is 2',
          ],
          createdAt: '2025-03-21T05:10:57.114Z',
          updatedAt: '2025-03-21T07:20:43.634Z',
          __v: 2,
        },
      ]),
      { status: 200 }
    );
  }),
];



export const server = setupServer(...handlers);
export default handlers;
