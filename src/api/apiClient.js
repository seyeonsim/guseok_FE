import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKSERVER, // 기본 API 경로
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 가져오기
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default apiClient;