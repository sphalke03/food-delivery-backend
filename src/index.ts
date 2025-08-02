import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/user.routes';
import restaurantRoutes from './routes/restaurant.routes';
import deliveryAgentRoutes from './routes/deliveryAgent.routes';
import orderRoutes from './order/order.routes';
import ratingRoutes from './rating/rating.routes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/agents', deliveryAgentRoutes);
app.use('/orders', orderRoutes);
app.use('/ratings', ratingRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  })
  .catch((error) => console.error('DB Init Error:', error));
