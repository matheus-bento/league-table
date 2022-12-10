import {
  Db,
  Document,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
  WithoutId,
} from 'mongodb';

/**
 *  Class containing methods to manipulate the persisted league data
 */
export class LeagueRepository {
  private _db: Db;

  /**
   * @param {Db} db mongodb connection instance
   */
  constructor(db: Db) {
    this._db = db;
  }

  /**
   * Inserts a single document into a collection
   *
   * @param {string} collection The collection where the document will be saved
   * @param {Document} document The document that will be saved
   *
   * @return {Promise<InsertOneResult<Document>>}
   *   A promise with the insertion result
   */
  public insert(
      collection: string,
      document: Document): Promise<InsertOneResult<WithoutId<Document>>> {
    if (collection == null) {
      throw new Error('Collection not informed');
    }

    return this._db
        .collection(collection)
        .insertOne(document);
  }

  /**
   * Queries a collection and returns all values inside it
   * @param {string} collection The collection that will be queried
   */
  public async find(
      collection: string): Promise<Array<WithId<Document>> | null> {
    if (collection == null) {
      throw new Error('Collection not informed');
    }

    const documents: Array<WithId<Document>> = [];

    const cursor = this._db
        .collection(collection)
        .find();

    if (cursor != null) {
      while (await cursor.hasNext()) {
        // We can cast it into a document because we just checked that there
        // are still available documents to retrieve
        documents.push(await cursor.next() as WithId<Document>);
      }
      return documents;
    } else {
      return null;
    }
  }

  /**
   * Queries a collection looking for a document with the specified id
   *
   * @param {string} collection The collection that will be queried
   * @param {ObjectId} id The id to be found inside the collection
   *
   * @return {Promise<WithId<Document> | null>}
   *   A promise with the document found or null if no document is found
   */
  public findByObjectId(
      collection: string,
      id: ObjectId): Promise<WithId<Document> | null> {
    if (collection == null) {
      throw new Error('Collection not informed');
    }

    return this._db
        .collection(collection)
        .findOne({_id: id});
  }

  /**
   * Updates a document with the specified ObjectId
   *
   * @param {string} collection The collection that will be updated
   * @param {ObjectId} id The id of the document that will be updated
   * @param {Document} document The data tha will be inserted into the document
   *
   * @return {Promise<UpdateResult>}
   */
  public updateDocument(
      collection: string,
      id: ObjectId,
      document: Document): Promise<UpdateResult> {
    if (collection == null) {
      throw new Error('Collection not informed');
    }

    return this._db
        .collection(collection)
        .updateOne(
            {_id: id},
            {$set: document});
  }
}
