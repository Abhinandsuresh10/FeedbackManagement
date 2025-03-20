import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../store/authStore';

const API_URL = 'http://localhost:3000/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const fetchAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/getUsers`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${useUserStore.getState().accessToken}`,
    },
  });
  return response.data;
};

export const useAllUsersQuery = () => {
  return useQuery<User[], Error>({
    queryKey: ['allUsers'],
    queryFn: fetchAllUsers,
  });
};