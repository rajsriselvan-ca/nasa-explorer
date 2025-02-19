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

export const fetchMarsRoverPhotos = async (sol: number, page: number = 1, pageSize: number = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mars-rover`, {
      params: { sol, page, pageSize },
    });
    return response.data; // Ensure this returns an array of photos
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    throw new Error('Failed to fetch Mars Rover photos. Please try again later.');
  }
};