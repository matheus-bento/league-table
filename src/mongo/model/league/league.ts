import {Model, Validation} from '../../validation';

const leagueModel: Model = [
  ['name', [Validation.Types.String, Validation.NotNull, Validation.NotEmpty]],
  ['teams', [Validation.Types.Array, Validation.NotEmpty]],
];

export default leagueModel;
