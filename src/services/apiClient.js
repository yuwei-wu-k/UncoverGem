import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://www.uncovergem.com', // Server's base URL
});

export default apiClient;
