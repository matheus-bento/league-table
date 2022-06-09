import bodyParser from 'body-parser';
import express from 'express';

import leagueRouter from './routers/league';

const port = 80;
const app = express();

// middleware configuration
app.use(bodyParser.json());

// API routers
app.use('/league', leagueRouter);

app.listen(port, () => {
  console.log(`express listening on http://localhost:${port}`);
});
