
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAPOD = async () => {
  const response = await axios.get(`${API_BASE_URL}/apod`);
  return response.data;
};

export const fetchEPIC = async () => {
  const response = await axios.get(`${API_BASE_URL}/epic`);
  return response.data;
};

export const fetchNeo = async () => {
  const response = await axios.get(`${API_BASE_URL}/neo`);
  return response.data;
};

export const fetchMarsRoverPhotos = async () => {
  const response = await axios.get(`${API_BASE_URL}/mars-rover`);
  return response.data;
};