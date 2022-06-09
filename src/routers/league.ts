import router, {Router, Request, Response} from 'express';
import {InsertOneResult, ObjectId} from 'mongodb';

import * as MongoDatabase from '../mongo/database';

const leagueRouter: Router = router();

/**
 * Gets the league by the ID.
 * Usage: GET /league/62a16c8a15533e2beba23774
 */
leagueRouter.get('/:id', async (req: Request<{id: string}>, res: Response) => {
  try {
    const db = await MongoDatabase.connect();

    const league =
      await db.collection('leagues')
          .findOne({_id: ObjectId.createFromHexString(req.params.id)});

    if (league !== null) {
      res.status(200);
      res.send(league);
    } else {
      res.status(404);
      res.send('League not found');
    }
  } catch (err) {
    console.log(`[ERROR] Error on GET "${req.path}": ${err}`);
  }
});

/**
 * Inserts a league.
 * Usage: POST /league
 */
leagueRouter.post('/', async (req, res) => {
  try {
    const db = await MongoDatabase.connect();

    const mongoResponse: InsertOneResult<Document> =
      await db.collection('leagues')
          .insertOne(req.body);

    console.log(`MongoDB response: ${JSON.stringify(mongoResponse)}`);

    if (mongoResponse !== null) {
      const league =
          await db.collection('leagues')
              .findOne({_id: mongoResponse.insertedId});

      res.status(200);
      res.send(league);
    }
  } catch (err) {
    console.log(`[ERROR] Error on POST "${req.path}": ${err}`);

    res.status(500);
    res.send('League could not be inserted');
  }
});

export default leagueRouter;
