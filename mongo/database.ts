import {MongoClient, Db} from 'mongodb';

let database: Db | null = null;

/**
 * Gets the mongodb database connection for the application
 *
 * @return {Promise<Db>} A promise with the opened database connection
 */
export function connect(): Promise<Db> {
  return new Promise((resolve, reject) => {
    if (database === null) {
      if (process.env.MONGODB_CONN_STR === undefined) {
        throw new Error('The mongodb connection string was not defined');
      }
      MongoClient.connect(process.env.MONGODB_CONN_STR, (err, client) => {
        if (err !== undefined) {
          reject(err);
        } else if (client === undefined) {
          reject(new Error('The generated MongoClient was undefined'));
        } else {
          database = client.db();
          resolve(database);
        }
      });
    } else {
      resolve(database);
    }
  });
}
