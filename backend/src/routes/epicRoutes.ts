import express from 'express';
import { getEPIC } from '../controllers/epicController';

const router = express.Router();

router.get('/', getEPIC);

export default router;