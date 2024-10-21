import axios from 'axios';
import { accessTokenService } from '../services/accessTokenService';

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
  error => {
    // const { handleRefreshToken } = useAuthStore()

    if (error.response.status === 401) {
      // handleRefreshToken()
      return Promise.resolve()
    }

    return Promise.reject(error)
  }
)

export const useHttp = instance