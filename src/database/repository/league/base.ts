import {ObjectId} from 'mongodb';
import {League} from '../../../model/league';

/**
 * Interface that represents a class that can access and modify league entities
 * within a data store
 */
export interface LeagueRepository {
  /**
  * Returns all items on the data store
  * @return {Promise<Array<League> | null>}
  *   A promise with an array of leagues or null as its callback value
  */
  findAll(): Promise<Array<League> | null>
  /**
  * Returns the league associated with the given ID
  * @param {ObjectId} id The searched league's ID
  * @return {Promise<League | null>}
  *   A promise with the league found or null as its callback value
  */
  findById(id: ObjectId): Promise<League | null>
  /**
   * Inserts a league into the data store
   * @param {League} model The league data that will be inserted
   * @return {Promise<League>}
   *   A promise with the inserted league as its callback value
   */
  insert(model: League): Promise<League>
  /**
   * Updates an existing league in the data store
   * @param {ObjectId} id The ID of the league to be updated
   * @param {League} model
   *  The data that will be inserted into the specified league
   * @return {Promise<League>}
   *   A promise with the updated league as its callback value
   */
  update(id: ObjectId, model: League): Promise<League>
}
