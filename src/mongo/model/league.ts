import {Model} from '../validation/model';

const leagueModel: Model = [
  ['name', ['string', 'not null', 'not empty']],
  ['teams', ['array', 'not empty']],
];

export default leagueModel;
