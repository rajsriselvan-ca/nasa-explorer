import axios from 'axios';
import { EPICResponse } from '../types/epicTypes';
import { cacheData, getCachedData, EPIC_CACHE_KEY, checkAndEvictCache } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchEPIC = async (): Promise<EPICResponse[]> => {
  const cachedData = await getCachedData(EPIC_CACHE_KEY);

  if (cachedData) {
    console.log('Serving EPIC data from cache');
    return cachedData;
  }

  console.log('Fetching EPIC data from NASA API');
  const response = await axios.get<EPICResponse[]>(
    `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
  );
  await cacheData(EPIC_CACHE_KEY, response.data); // Cache the data
  await checkAndEvictCache(); // Evict old keys if necessary
  return response.data;
};