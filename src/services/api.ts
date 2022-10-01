import { getAdsRepository } from '@/repositories/Ads';
import { getGamesRepository } from '@/repositories/Games';
import axios from 'axios';

const apiClient = axios.create({ baseURL: import.meta.env.VITE_BASE_API_URL });

export const api = {
	ads: getAdsRepository(apiClient),
	games: getGamesRepository(apiClient)
};