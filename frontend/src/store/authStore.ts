import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    user: { name: string; email: string ,role:string} | null;
    accessToken: string | null;
    setUser: (user: { name: string; email: string ,role: string}, token: string) => void;
    logout: () => void;
  }
  export const useUserStore = create<UserState>()(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        setUser: (user, token) => set({ user, accessToken: token }),
        logout: () => set({ user: null, accessToken: null }),
      }),
      {
        name: "user-storage", 
      }
    )
  );  