import axios from 'axios';

const logitrackApi = axios.create({
  // Vite usa import.meta.env para leer variables de entorno.
  // Si la variable no existe, usa localhost como respaldo para cuando programes en tu PC.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

export default logitrackApi;
