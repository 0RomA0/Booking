import axios from 'axios';

const api = axios.create({
  baseURL: 'https://booking-api-ga04.onrender.com',
});

export default api;
