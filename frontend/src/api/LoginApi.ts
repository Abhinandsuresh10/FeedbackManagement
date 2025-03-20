import axios from 'axios';
import { useUserStore } from '../store/authStore';
import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:3000/api'; 

interface LoginData {
  email: string;
  password: string;
}

const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      useUserStore.getState().setUser(data.user, data.jwtoken);
      console.log("User logged in:", useUserStore.getState());
    },
    onError: (error: any) => {
      console.error("Login error:", error.message);
    },
  });
};