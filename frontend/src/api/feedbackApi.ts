import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from '../store/authStore';

const API_URL = 'http://localhost:3000/api';

interface FeedbackData {
  feedback: string;
}

const submitFeedback = async (data: FeedbackData) => {
  const response = await axios.post(`${API_URL}/feedback`, data, {
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${useUserStore.getState().accessToken}`,
    }
  });
  return response.data;
};

export const useFeedback = () => {
  return useMutation({
    mutationFn: submitFeedback,
    onSuccess: (data) => {
      console.log("Feedback submitted successfully:", data);
    },
    onError: (error: any) => {
      console.error("Feedback submission error:", error.message);
    },
  });
};