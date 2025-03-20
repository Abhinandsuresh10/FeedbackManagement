import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../store/authStore';

const API_URL = 'http://localhost:3000/api';

interface Feedback {
  id: number;
  time: Date;
  message: string;
}

const fetchFeedback = async (): Promise<Feedback[]> => {
  const response = await axios.get(`${API_URL}/getFeedbacks`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${useUserStore.getState().accessToken}`,
    },
  });
  return response.data;
};

export const useFeedbackQuery = () => {
  return useQuery<Feedback[], Error>({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
  });
};