import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import deliveryRoutes from './routes/deliveryRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/agents', deliveryRoutes);

const PORT = process.env.PORT || 3002;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Delivery Agent Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Delivery Agent DB connection failed:', err);
  });
