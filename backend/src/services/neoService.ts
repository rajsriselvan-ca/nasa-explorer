import axios from 'axios';
import { NeoData } from '../types/neoTypes';
import { cacheData, getCachedData, NEO_CACHE_KEY, checkAndEvictCache } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchNeoData = async (): Promise<NeoData[]> => {
  const cachedData = await getCachedData(NEO_CACHE_KEY);

  if (cachedData) {
    console.log('Serving NEO data from cache');
    return cachedData;
  }

  console.log('Fetching NEO data from NASA API');
  const response = await axios.get<{ near_earth_objects: Record<string, NeoData[]> }>(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-07&api_key=${NASA_API_KEY}`
  );
  const data = Object.values(response.data.near_earth_objects).flat();
  await cacheData(NEO_CACHE_KEY, data); // Cache the data
  await checkAndEvictCache(); // Evict old keys if necessary
  return data;
};