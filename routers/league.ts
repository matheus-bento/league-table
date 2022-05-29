import router, {Router, Request, Response} from 'express';

const leagueRouter: Router = router();

/**
 * Gets the league by the ID.
 * Usage: GET /league/1
 */
leagueRouter.get('/:id', (req: Request<{ id: number }>, res: Response) => {
  res.status(200);
  res.send({
    id: req.params.id,
    name: 'Test league',
  });
});

export default leagueRouter;
