import router, {Router, Request, Response} from 'express';
import {ObjectId, WithId} from 'mongodb';

import * as MongoDatabase from '../database';
import {League} from '../model/league';
import {LeagueMongoDbRepository} from '../database/repository/league';

import {RequestWithBody, RequestWithBodyAndParams} from './types';

const leagueRouter: Router = router();

/*
  Gets all leagues.
  Usage: GET /league
 */
leagueRouter.get('/', async (req: Request<{id: string}>, res: Response) => {
  try {
    const db = await MongoDatabase.connect();
    const leagueRepository = new LeagueMongoDbRepository(db);

    const leagues: Array<League> | null =
        await leagueRepository.findAll();

    if (leagues !== null && leagues.length > 0) {
      res.status(200);
      res.send(leagues);
    } else {
      res.status(404);
      res.send('No leagues found');
    }
  } catch (err) {
    console.log(`[ERROR] Error on GET "${req.path}": ${err}`);

    res.status(500);
    res.send('An error occurred when processing this request');
  }
});

/*
  Gets the league by the ID.
  Usage: GET /league/62a16c8a15533e2beba23774
 */
leagueRouter.get('/:id', async (req: Request<{id: string}>, res: Response) => {
  try {
    const db = await MongoDatabase.connect();
    const leagueRepository = new LeagueMongoDbRepository(db);

    const league: League | null =
      await leagueRepository
          .findById(ObjectId.createFromHexString(req.params.id));

    if (league !== null) {
      res.status(200);
      res.send(league);
    } else {
      res.status(404);
      res.send('League not found');
    }
  } catch (err) {
    console.log(`[ERROR] Error on GET "${req.path}": ${err}`);

    res.status(500);
    res.send('An error occurred when processing this request');
  }
});

/*
  Inserts a league.
  Usage: POST /league
 */
leagueRouter.post('/', async (req: RequestWithBody<League>, res) => {
  try {
    const db = await MongoDatabase.connect();
    const leagueRepository = new LeagueMongoDbRepository(db);

    const inserted = await leagueRepository.insert(req.body);

    res.status(200);
    res.send(inserted);
  } catch (err) {
    console.log(`[ERROR] Error on POST "${req.path}": ${err}`);

    res.status(500);
    res.send('An error occurred when processing this request');
  }
});

/*
  Partially updates a league's information
  Usage: PATCH /league
 */
leagueRouter.patch(
    '/:id', async (
        req: RequestWithBodyAndParams<{id: string}, WithId<League>>, res) => {
      try {
        const db = await MongoDatabase.connect();
        const leagueRepository = new LeagueMongoDbRepository(db);

        const leagueId = ObjectId.createFromHexString(req.params.id);
        const league = await leagueRepository.update(leagueId, req.body);

        res.status(200);
        res.send(league);
      } catch (err) {
        console.log(`[ERROR] Error on PATCH "${req.path}": ${err}`);

        res.status(500);
        res.send('An error occurred when processing this request');
      }
    });

export default leagueRouter;
