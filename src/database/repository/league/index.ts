import {
  Db,
  FindCursor,
  ObjectId,
  InsertOneResult,
} from 'mongodb';
import {League} from '../../../model/league';
import {LeagueRepository} from './base';

/**
 * Class to manipulate the records on the "leagues" collection
 */
export class LeagueMongoDbRepository implements LeagueRepository {
/**
   * The MongoDb connection instance used by the repository
   */
  private _db: Db;

  /**
   * Name of the collection accessed by this repository
   */
  private _collection = 'leagues';

  /**
   * @param {Db} db mongodb connection instance
   */
  constructor(db: Db) {
    this._db = db;
  }

  /**
   * Returns all leagues stored in the collection
   * @return {Promise<Array<T> | null>}
   *   A promise with an array of leagues or null as its callback value
   */
  public async findAll(): Promise<Array<League> | null> {
    const documents: Array<League> = [];

    const cursor: FindCursor<League> =
        this._db
            .collection(this._collection)
            .find<League>({});

    if (cursor !== null) {
      while (await cursor.hasNext()) {
        // We can cast it into a document because we just checked that there
        // are still available documents to retrieve
        documents.push(await cursor.next() as League);
      }

      return documents;
    } else {
      return null;
    }
  }

  /**
   * Returns the league associated with the given ObjectId
   * @param {I} id The searched league's ID
   * @return {Promise<T | null>}
   *   A promise with the league found or null as its callback value
   */
  public async findById(id: ObjectId): Promise<League | null> {
    return await this._db
        .collection(this._collection)
        .findOne<League>({_id: id});
  }

  /**
   * Inserts a league into the collection
   * @param {League} league The league data that will be inserted
   * @return {Promise<League>}
   *   A promise with the inserted league as its callback value
   */
  public async insert(league: League): Promise<League> {
    const insertRes: InsertOneResult<League> =
        await this._db
            .collection(this._collection)
            .insertOne(league);

    const inserted = await this.findById(insertRes.insertedId);

    if (inserted == null) {
      throw new Error(
          `Document "${JSON.stringify(league)}" could not be ` +
          `inserted in the collection "${this._collection}"`);
    }

    return inserted;
  }

  /**
   * Updates an existing league in the collection.
   * @param {ObjectId} id The ID of the league to be updated
   * @param {League} league
   *   The data that will be inserted into the specified league
   * @return {Promise<T>}
   *   A promise with the updated league as its callback value
   */
  public async update(
      id: ObjectId, league: League): Promise<League> {
    await this._db
        .collection(this._collection)
        .updateOne(
            {_id: id},
            {$set: league});

    const updated = await this.findById(id);

    if (updated == null) {
      throw new Error(
          `Document "${JSON.stringify(league)}" in the collection ` +
          `"${this._collection}" could not be found`);
    }

    return updated;
  }
}
