import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';
const AUTH_TOKEN = 'mysecrettoken';

export const fetchServerTime = async () => {
  const response = await axios.get(`${API_BASE_URL}/time`, {
    headers: { Authorization: AUTH_TOKEN },
  });
  return response.data;
};

export const fetchMetrics = async () => {
  const response = await axios.get(`${API_BASE_URL}/metrics`, {
    headers: { Authorization: AUTH_TOKEN },
  });
  return response.data;
};
