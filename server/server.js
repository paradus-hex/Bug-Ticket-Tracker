import * as dotenv from 'dotenv';
import express from 'express';
import RootRouter from "./routes/index.js";



dotenv.config();
const app = express();

const SERVER_PORT=process.env.SERVER_PORT


app.use(express.json());


app.use('/v1', RootRouter);

// for testing purposes
app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(SERVER_PORT, async () => {
  console.log(`API Server listening on port ${SERVER_PORT}`);
});
