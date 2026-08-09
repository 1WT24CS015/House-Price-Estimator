const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1';

export const env = Object.freeze({
  apiBaseUrl: rawApiBaseUrl,
  isProduction: import.meta.env.PROD,
});
