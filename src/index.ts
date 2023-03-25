
import bodyParser from 'body-parser';
import express from 'express';

import leagueRouter from './routers/league';

// configuring environment from local .env file
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const app = express();

// middleware configuration
app.use(bodyParser.json());

// API routers
app.use('/league', leagueRouter);

app.listen(port, () => {
  console.log(`express listening on http://localhost:${port}`);
});

export default app;
