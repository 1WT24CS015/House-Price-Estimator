const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api/v1';

export const env = Object.freeze({
  apiBaseUrl: rawApiBaseUrl,
  isProduction: import.meta.env.PROD,
});
