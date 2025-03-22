import { renderHook, waitFor } from '@testing-library/react';
import { useFeedbackQuery } from '../getFeedback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/handlers';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useFeedbackQuery Hook', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should fetch feedbacks successfully', async () => {
    const { result } = renderHook(() => useFeedbackQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
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
    ]);
  });

  it('should handle feedback fetching error', async () => {
    server.use(
      http.get('http://localhost:3000/api/getFeedbacks', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useFeedbackQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});