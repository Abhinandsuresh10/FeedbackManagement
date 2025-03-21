    import { renderHook, waitFor } from '@testing-library/react';
    import { useLogin  } from '../LoginApi';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
    import { http, HttpResponse } from 'msw';
    import { server } from '../../mocks/server';

    const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    };

    describe('useLogin Hook', () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('should login a user successfully', async () => {
        const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
        });

        result.current.mutate({
        email: 'test@example.com',
        password: 'password123'
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual({
        message: 'User logged in successfully'
        });
    });

    it('should handle registration error', async () => {
        server.use(
        http.post('http://localhost:3000/api/login', () => {
            return new HttpResponse(null, { status: 500 });
        })
        );

        const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
        });

        result.current.mutate({
        email: 'test@example.com',
        password: 'password123'
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBeDefined();
    });
    });