import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { CLIENT_URL, SERVER_PORT } from './config';
import { logger } from './middlewares';
import RootRouter from './routes';

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use('/v1', RootRouter);

// for testing purposes
app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(SERVER_PORT, async () => {
  console.log(`API Server listening on port ${SERVER_PORT}`);
});
