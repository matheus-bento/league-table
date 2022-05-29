import ExpressServer from './express-server';
import leagueRouter from './routers/league';

const port = 8080;
const server = new ExpressServer(port);

server.addRouter('/league', leagueRouter);

server.start(() => console.log(`express listening on http://localhost:${port}`));
