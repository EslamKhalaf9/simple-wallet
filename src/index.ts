import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import errorHandler from './middlewares/errorhandler.middleware';
import swaggerDocs from './utils/swagger/swagger';
import notFound from './middlewares/404.middleware';

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    status: 'OK',
  });
});

swaggerDocs(app, port);

app.use(routes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
