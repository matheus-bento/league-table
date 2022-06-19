import {describe, it} from 'mocha';
import {assert} from 'chai';

import * as validation from '../src/mongo/validation';

describe('Mongo model registration', function() {
  it('should throw if trying to register a model with an existing name',
      function() {
        validation.register('model', [
          ['field', validation.Validation.Types.String],
        ]);

        assert.throws(() => validation.register('model', [
          ['anotherField', validation.Validation.Types.Number],
        ]));
      });
});
