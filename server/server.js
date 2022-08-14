import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import RootRouter from './routes/index.js';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
dotenv.config();

const app = express();
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());

app.use('/api/v1', RootRouter);

// for testing purposes
app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(SERVER_PORT, async () => {
  console.log(`API Server listening on port ${SERVER_PORT}`);
});
