import axios from 'axios';
import { MarsRoverPhoto } from '../types/marsRoverTypes';
import { cacheData, getCachedData, MARS_ROVER_CACHE_KEY, checkAndEvictCache } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchMarsRoverPhotos = async (): Promise<MarsRoverPhoto[]> => {
  const cachedData = await getCachedData(MARS_ROVER_CACHE_KEY);

  if (cachedData) {
    console.log('Serving Mars Rover data from cache');
    return cachedData;
  }

  console.log('Fetching Mars Rover data from NASA API');
  const response = await axios.get<{ photos: MarsRoverPhoto[] }>(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
  );
  await cacheData(MARS_ROVER_CACHE_KEY, response.data.photos); // Cache the data
  await checkAndEvictCache(); // Evict old keys if necessary
  return response.data.photos;
};