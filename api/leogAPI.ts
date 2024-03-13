import axios from 'axios';

const leogAPI = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default leogAPI;
