import { Request, Response } from 'express';
import { fetchAPOD } from '../services/apodService';

export const getAPOD = async (req: Request, res: Response) => {
  try {
    const data = await fetchAPOD();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
};  