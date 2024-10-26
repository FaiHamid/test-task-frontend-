import axios from 'axios';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
});

instance.interceptors.request.use(
  config => {
    const accessToken = accessTokenService.get()

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

instance.interceptors.response.use(
  res => res.data,
  async error => {
    const originalRequest = error.config;

    if (error.response.status !== 401) {
    throw error;
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    return instance.request(originalRequest);
  } catch (error) {
    throw error;
  }
  
  }
)

export const useHttp = instance