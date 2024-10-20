import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl || '',
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },
  
  async post<T, U>(url: string, data: U) {
    const response = await instance.post<T>(url, data);
    
    return response.data;
  },
};