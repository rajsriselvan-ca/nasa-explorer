import { Request, Response } from 'express';
import { fetchMarsRoverPhotos } from '../services/nasaService';

export const getMarsRoverPhotos = async (req: Request, res: Response) => {
  try {
    const data = await fetchMarsRoverPhotos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
};