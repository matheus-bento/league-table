import leagueModel from './league';
import {Model, Validation} from '../../validation';

const leaguePatchModel: Model = [
  ['_id', [Validation.Types.String, Validation.NotNull, Validation.NotEmpty]],
  ...leagueModel,
];

export default leaguePatchModel;
