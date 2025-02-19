import { Request, Response } from 'express';
import { fetchMarsRoverPhotos } from '../services/marsRoverService';

export const getMarsRoverPhotos = async (req: Request, res: Response) => {
  try {
    // Extract sol, page, and pageSize from query parameters
    const sol = parseInt(req.query.sol as string, 10) || 1000; 
    const page = parseInt(req.query.page as string, 10) || 1; 
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10; 

    // Call the service function with the extracted parameters
    const data = await fetchMarsRoverPhotos(sol, page, pageSize);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getMarsRoverPhotos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
};