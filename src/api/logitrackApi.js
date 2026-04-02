import axios from 'axios';

const logitrackApi = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export default logitrackApi;
