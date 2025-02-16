import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import apodRoutes from './routes/apodRoutes';
import epicRoutes from './routes/epicRoutes';
import neoRoutes from './routes/neoRoutes';
import marsRoverRoutes from './routes/marsRoverRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apod', apodRoutes);
app.use('/api/epic', epicRoutes);
app.use('/api/neo', neoRoutes);
app.use('/api/mars-rover', marsRoverRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});