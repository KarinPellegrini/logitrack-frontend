import axios from 'axios';

const logitrackApi = axios.create({
  // Usamos VITE_API_BASE_URL para coincidir con tu búsqueda anterior en VS Code.
  // El "||" asegura que si estás en tu PC (donde la variable no existe), use localhost.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
});

export default logitrackApi;
