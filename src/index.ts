import bodyParser from 'body-parser';
import express from 'express';

import leagueRouter from './routers/league';
import * as validation from './mongo/validation';
import leagueModel from './mongo/model/league';

const port = 80;
const app = express();

// middleware configuration
app.use(bodyParser.json());

// API routers
app.use('/league', leagueRouter);

// model registration
validation.register('league', leagueModel);

app.listen(port, () => {
  console.log(`express listening on http://localhost:${port}`);
});
