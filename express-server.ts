import express, {Express, Router} from 'express';

/**
 * Class used to manage the express server instance
 */
export default class ExpressServer {
  private _port: number;
  private _server: Express;

  /**
   * Builds an ExpressServer instance
   * @param {number} port The port on which the express server will listen
   */
  constructor(port: number) {
    this._port = port;
    this._server = express();
  }

  /**
  * Adds a router to the express application
  * @param {string} path The path to access the router endpoints
  * @param {Router} router The router with the endpoints for the controller
  */
  public addRouter(path: string, router: Router): void {
    this._server.use(path, router);
  }

  /**
   * Starts the express server
   * @param {function} callback A function to be executed after the server has
   * started
   */
  public start(callback?: () => void): void {
    this._server.listen(this._port, callback);
  }
}
