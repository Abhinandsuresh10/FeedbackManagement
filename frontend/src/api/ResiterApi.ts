import axios from 'axios';
import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:3000/api'; 

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
    },
    onError: (error: any) => {
      console.error("Registration error:", error.message);
    },
  });
};