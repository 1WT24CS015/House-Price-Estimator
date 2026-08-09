import { apiClient } from './client';

export async function requestPrediction(payload) {
  const response = await apiClient.post('/predict', payload);
  return response.data.data;
}
