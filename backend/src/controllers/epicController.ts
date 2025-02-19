import { Request, Response } from 'express';
import { fetchEPICByDate } from '../services/epicService';

export const getEPIC = async (req: Request, res: Response) => {
  try {
    // Extract date from query parameters, if available
    const date = req.query.date as string | undefined;
    const data = await fetchEPICByDate(date);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
};
