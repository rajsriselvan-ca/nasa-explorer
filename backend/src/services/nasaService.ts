import axios from 'axios';
import { APODResponse } from '../types/apodTypes';
import { EPICResponse } from '../types/epicTypes';
import { NeoData } from '../types/neoTypes';
import { MarsRoverPhoto } from '../types/marsRoverTypes';
const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchAPOD = async (): Promise<APODResponse> => {
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
  );
  return response.data;
};

export const fetchEPIC = async (): Promise<EPICResponse[]> => {
  const response = await axios.get(
    `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
  );
  return response.data;
};

export const fetchNeoData = async (): Promise<NeoData[]> => {
    const response = await axios.get<{ near_earth_objects: Record<string, NeoData[]> }>(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-07&api_key=${NASA_API_KEY}`
    );
    return Object.values(response.data.near_earth_objects).flat();
};

export const fetchMarsRoverPhotos = async (): Promise<MarsRoverPhoto[]> => {
  const response = await axios.get(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
  );
  return response.data.photos;
};