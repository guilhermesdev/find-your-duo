import { AxiosInstance } from 'axios';

interface createAdParams {
	gameId: string,
	name: string,
	discord: string,
	weekDays: number[],
	yearsPlaying: number,
	hourStart: string,
	hourEnd: string,
	useVoiceChannel: boolean
}

export const getAdsRepository = (apiClient: AxiosInstance) => ({
	create(params: createAdParams) {
		return apiClient.post('/ads', params);
	}
});