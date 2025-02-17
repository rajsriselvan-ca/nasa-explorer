import axios from 'axios';
import { APODResponse } from '../types/apodTypes';
import { cacheData, getCachedData, APOD_CACHE_KEY, checkAndEvictCache } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchAPOD = async (): Promise<APODResponse> => {
  const cachedData = await getCachedData(APOD_CACHE_KEY);

  if (cachedData) {
    console.log('Serving APOD data from cache');
    return cachedData;
  }

  console.log('Fetching APOD data from NASA API');
  const response = await axios.get<APODResponse>(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
  );
  await cacheData(APOD_CACHE_KEY, response.data); // Cache the data
  await checkAndEvictCache(); // Evict old keys if necessary
  return response.data;
};