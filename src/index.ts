import bodyParser from 'body-parser';
import express from 'express';

import leagueRouter from './routers/league';
import * as validation from './mongo/validation';
import {leagueModel, leaguePatchModel} from './mongo/model/league';

const port = process.env.PORT;
const app = express();

// middleware configuration
app.use(bodyParser.json());

// API routers
app.use('/league', leagueRouter);

// model registration
validation.register('league', leagueModel);
validation.register('league-patch', leaguePatchModel);

app.listen(port, () => {
  console.log(`express listening on http://localhost:${port}`);
});
