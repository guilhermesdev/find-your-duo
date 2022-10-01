import { AxiosInstance } from 'axios';

export const getGamesRepository = (apiClient: AxiosInstance) => ({
	getMany() {
		return apiClient.get('/games');
	}
});