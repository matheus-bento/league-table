import {MongoClient, Db} from 'mongodb';

let database: Db | null = null;

/**
 * Gets the mongodb database connection for the application
 *
 * @return {Promise<Db>} A promise with the opened database connection
 */
export function connect(): Promise<Db> {
  return new Promise(async (resolve, reject) => {
    if (database === null) {
      try {
        if (process.env.MONGODB_CONN_STR === undefined) {
          throw new Error('The mongodb connection string was not defined');
        } else {
          // The database to be used is informed on the connection string
          const client =
              await new MongoClient(process.env.MONGODB_CONN_STR).connect();

          if (client === undefined) {
            throw new Error('The generated MongoClient was undefined');
          } else {
            database = client.db();
            resolve(database);
          }
        }
      } catch (err) {
        reject(err);
      }
    } else {
      resolve(database);
    }
  });
}
