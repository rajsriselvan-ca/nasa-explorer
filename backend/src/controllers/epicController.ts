import { Request, Response } from 'express';
import { fetchEPIC } from '../services/epicService';

export const getEPIC = async (req: Request, res: Response) => {
  try {
    const data = await fetchEPIC();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
};