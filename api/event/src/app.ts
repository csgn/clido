import Express from 'express';
import 'express-async-errors';

import { errorHandler } from './middlewares/error-handler';

import { createRouter } from './routes/create';
import { allRouter } from './routes/all';
import { removeRouter } from './routes/remove';

import { NotFoundError } from './errors/not-found-error';

const app = Express();
app.set('trust proxy', true);
app.use(Express.json());

app.use(createRouter);
app.use(allRouter);
app.use(removeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
