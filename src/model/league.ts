import {Document} from 'mongodb';

export interface League extends Document {
  name: string
  teams: Array<string>
}
