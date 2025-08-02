import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import restaurantRoutes from './routes/restaurantRoutes';
import ratingRoutes from './routes/ratingRoutes';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Enable JSON request bodies

// Register RESTful routes
app.use('/restaurants', restaurantRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 3000;

// Connect to DB and start the server
AppDataSource.initialize()
  .then(() => app.listen(PORT, () => console.log(`Restaurant-User Service running on port ${PORT}`)))
  .catch((err) => console.error('DB connection error:', err));
