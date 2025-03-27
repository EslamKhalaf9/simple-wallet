import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import errorHandler from './middlewares/errorhandler.middleware';

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    status: 'OK',
  });
});

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
