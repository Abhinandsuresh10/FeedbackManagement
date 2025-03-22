import { renderHook, waitFor } from '@testing-library/react';
import { useFeedback  } from '../feedbackApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi} from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';


vi.mock('../store/authStore', () => ({
    useUserStore: {
      getState: () => ({
        accessToken: 'mock-access-token', 
      }),
    },
  }));


const createWrapper = () => {
const queryClient = new QueryClient();
return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
};

describe('useFeedback Hook', () => {
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it('should submit a feedback successfully', async () => {
    const { result } = renderHook(() => useFeedback(), {
    wrapper: createWrapper(),
    });

    result.current.mutate({
      feedback: 'this is a test feedback message'
    });
      console.log(result.current.isSuccess)
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      message: 'Feedback submitted successfully'
    });
});

it('should handle feedback submission error', async () => {
    server.use(
    http.post('http://localhost:3000/api/feedback', () => {
        return new HttpResponse(null, { status: 500 });
    })
    );

    const { result } = renderHook(() => useFeedback(), {
    wrapper: createWrapper(),
    });

    result.current.mutate({
        feedback: 'This is a test feedback message',
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
});
});