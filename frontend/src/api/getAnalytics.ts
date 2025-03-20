import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../store/authStore';

const API_URL = 'http://localhost:3000/api';

interface AnalyticsData {
    totalMessages: number;
    users: string[];
  }
  


const fetchAnalytics = async (): Promise<AnalyticsData> => {
    try {
    const response = await axios.get(`${API_URL}/getAnalytics`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${useUserStore.getState().accessToken}`,
        }
    });
    return response.data;
} catch (error) {
    console.error("Failed to fetch analytics:", error);
    throw error; 
}
}

export const useAnalytics = () => {
    return useQuery<AnalyticsData>({
        queryKey: ['analytics'],
        queryFn: fetchAnalytics,
      });
};