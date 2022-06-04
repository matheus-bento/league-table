import router, {Router, Request, Response} from 'express';
import {Db} from 'mongodb';

import * as MongoDatabase from '../mongo/database';

const leagueRouter: Router = router();

/**
 * Gets the league by the ID.
 * Usage: GET /league/1
 */
leagueRouter.get('/:id', (req: Request<{ id: number }>, res: Response) => {
  MongoDatabase
      .connect()
      .then((db: Db) => {
        db.collection('leagues')
            .findOne({id: req.params.id})
            .then((league) => {
              if (league !== null) {
                res.status(200);
                res.send({
                  id: req.params.id,
                  name: 'Test league',
                });
              } else {
                res.status(404);
                res.send('League not found');
              }
            });
      })
      .catch((err) => {
        console.log(`[ERROR] Error on GET "${req.path}": ${err}`);
      });
});

/**
 * Inserts a league.
 * Usage: POST /league
 */
leagueRouter.post('/', (req, res) => {
  MongoDatabase
      .connect()
      .then((db: Db) => {
        db.collection('leagues')
            .insertOne(req.body)
            .then((mongoResponse) => {
              if (mongoResponse !== null) {
                const inserted =
                    db.collection('leagues')
                        .findOne({'_id': mongoResponse.insertedId});

                res.status(200);
                res.send(inserted);
              }
            })
            .catch((err) => {
              console.log(`[ERROR] Error on league insertion: ${err}`);

              res.status(500);
              res.send('League could not be inserted');
            });
      })
      .catch((err) => {
        console.log(`[ERROR] Error on POST "${req.path}": ${err}`);
      });
});

export default leagueRouter;
