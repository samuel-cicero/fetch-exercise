import express, { Express } from 'express';
import dotenv from 'dotenv';
import receiptRoutes from './api/routes/receiptRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
   console.log(
      `[server]: Server is running at http://localhost:${port}. If running via docker, access port 3001`,
   );
});

app.use('/receipts', receiptRoutes);
