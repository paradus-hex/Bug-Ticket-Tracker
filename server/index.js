const express = require('express');
const morgan = require('morgan');

const ticketRouter = require('./routes/ticketRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


// 3) ROUTES
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/users', userRouter);




const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});