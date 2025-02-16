import express from 'express';
import { getMarsRoverPhotos } from '../controllers/marsRoverController';

const router = express.Router();

router.get('/', getMarsRoverPhotos);

export default router;