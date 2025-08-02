import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('User Service DB connection failed:', err);
  });
