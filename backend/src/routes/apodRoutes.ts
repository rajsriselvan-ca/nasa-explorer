import express from 'express';
import { getAPOD } from '../controllers/apodController';

const router = express.Router();

router.get('/', getAPOD);

export default router;