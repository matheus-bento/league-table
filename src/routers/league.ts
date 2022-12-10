import router, {Router, Request, Response} from 'express';
import {
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
  Document,
} from 'mongodb';

import * as MongoDatabase from '../database';
import {LeagueRepository} from '../database/repository/league';
import {League} from '../model/league';

import {RequestWithBody} from './types';

const leagueRouter: Router = router();

/*
  Gets all leagues.
  Usage: GET /league
 */
leagueRouter.get('/', async (req: Request<{id: string}>, res: Response) => {
  try {
    const db = await MongoDatabase.connect();
    const leagueRepository = new LeagueRepository(db);

    const leagues: Array<WithId<Document>> | null =
        await leagueRepository.find('leagues');

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
    const leagueRepository = new LeagueRepository(db);

    const league: WithId<Document> | null =
      await leagueRepository
          .findByObjectId(
              'leagues',
              ObjectId.createFromHexString(req.params.id));

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
    const leagueRepository = new LeagueRepository(db);

    const mongoResponse: InsertOneResult<Document> =
      await leagueRepository.insert('leagues', req.body);

    console.log(`MongoDB response: ${JSON.stringify(mongoResponse)}`);

    if (mongoResponse !== null) {
      const league =
        await leagueRepository
            .findByObjectId('leagues', mongoResponse.insertedId);

      res.status(200);
      res.send(league);
    } else {
      throw new Error('InsertOneResult was null');
    }
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
leagueRouter.patch('/', async (req: RequestWithBody<WithId<League>>, res) => {
  try {
    const db = await MongoDatabase.connect();
    const leagueRepository = new LeagueRepository(db);

    const mongoResponse: UpdateResult =
      await leagueRepository.updateDocument('league', req.body._id, req.body);

    console.log(`MongoDB response: ${JSON.stringify(mongoResponse)}`);

    if (mongoResponse !== null) {
      const league =
        await leagueRepository
            .findByObjectId('leagues', mongoResponse.upsertedId);

      res.status(200);
      res.send(league);
    }
  } catch (err) {
    console.log(`[ERROR] Error on PATCH "${req.path}": ${err}`);

    res.status(500);
    res.send('An error occurred when processing this request');
  }
});

export default leagueRouter;
