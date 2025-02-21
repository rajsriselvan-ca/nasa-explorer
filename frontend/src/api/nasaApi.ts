import axios from 'axios';
import { handleApiError } from '../error-handling/errorUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAPOD = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/apod`);
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw handleApiError(error); 
  }
};

export const fetchEPIC = async (date?: string) => {
  try {
    const url = date ? `${API_BASE_URL}/epic?date=${date}` : `${API_BASE_URL}/epic`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    throw new Error(handleApiError(error));
  }
};

export const fetchNeo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/neo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    throw new Error(handleApiError(error));
  }
};

export const fetchMarsRoverPhotos = async (sol: number, page: number = 1, pageSize: number = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mars-rover`, {
      params: { sol, page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    throw new Error(handleApiError(error));
  }
};
