import { Request, Response } from 'express';
import { fetchNeoData } from '../services/neoService';

export const getNeoData = async (req: Request, res: Response) => {
  try {
    const data = await fetchNeoData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
};