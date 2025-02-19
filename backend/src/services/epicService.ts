import axios from 'axios';
import { EPICResponse } from '../types/epicTypes';
import { cacheData, getCachedData, EPIC_CACHE_KEY, checkAndEvictCache } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchEPICByDate = async (date?: string): Promise<EPICResponse[]> => {
  // If a date is provided, use the date endpoint; otherwise, fetch the default list
  const endpoint = date
    ? `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`
    : `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`;
    
  // Use a different cache key for each date
  const cacheKey = date ? `${EPIC_CACHE_KEY}:${date}` : EPIC_CACHE_KEY;

  const cachedData = await getCachedData(cacheKey);
  if (cachedData) {
    console.log(`Serving EPIC data from cache for date ${date || 'default'}`);
    return cachedData;
  }

  console.log('Fetching EPIC data from NASA API');
  const response = await axios.get<EPICResponse[]>(endpoint);
  await cacheData(cacheKey, response.data);
  await checkAndEvictCache();
  return response.data;
};
