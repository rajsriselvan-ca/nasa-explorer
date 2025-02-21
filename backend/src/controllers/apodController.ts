import { Request, Response } from 'express';
import { fetchAPOD } from '../services/apodService';

export const getAPOD = async (req: Request, res: Response) => {
  try {
    const data = await fetchAPOD();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching APOD:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred.';
    res.status(statusCode).json({ error: message }); 
  }
};
