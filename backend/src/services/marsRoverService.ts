import axios from 'axios';
import { MarsRoverPhoto } from '../types/marsRoverTypes';
import { cacheData, getCachedData, MARS_ROVER_CACHE_KEY } from '../utils/redisUtils';

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchMarsRoverPhotos = async (
  sol: number,
  page: number = 1,
  pageSize: number = 10
): Promise<MarsRoverPhoto[]> => {
  try {
    // Use a cache key that stores the entire dataset for the given sol
    const cacheKey = `${MARS_ROVER_CACHE_KEY}:sol:${sol}`;
    let allPhotos: MarsRoverPhoto[];

    // Get the full data from cache
    const cachedAllPhotos = await getCachedData(cacheKey);
    if (cachedAllPhotos) {
      // If your cache returns a JSON string, parse it
      allPhotos = typeof cachedAllPhotos === 'string' ? JSON.parse(cachedAllPhotos) : cachedAllPhotos;
    } else {
      const response = await axios.get<{ photos: MarsRoverPhoto[] }>(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`
      );
      allPhotos = response.data.photos;
      await cacheData(cacheKey, JSON.stringify(allPhotos), 3600);
    }

    // Perform pagination on the cached full dataset
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = allPhotos.slice(startIndex, endIndex);

    return paginatedData;
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    throw new Error('Failed to fetch Mars Rover photos. Please try again later.');
  }
};
