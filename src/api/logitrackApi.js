import axios from 'axios';

const logitrackApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default logitrackApi;
