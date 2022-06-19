import {describe, it} from 'mocha';
import {assert} from 'chai';

import * as validation from '../src/mongo/validation';

describe('Mongo field validation', function() {
  it('should allow an object with all the fields defined in the model',
      function() {
        validation.register('all-fields', [
          ['name', validation.Validation.Types.String],
          ['age', validation.Validation.Types.Number],
        ]);

        assert.isTrue(
            validation.validateFields('all-fields', {
              name: 'John Doe',
              age: 30,
            }));
      });

  it('should allow an object with some of the fields defined in the model',
      function() {
        validation.register('partial-fields', [
          ['name', validation.Validation.Types.String],
          ['age', validation.Validation.Types.Number],
        ]);

        assert.isTrue(
            validation.validateFields('partial-fields', {
              name: 'John Doe',
            }));
      });

  it('should not allow an object with none of the fields defined in the model',
      function() {
        validation.register('no-fields', [
          ['name', validation.Validation.Types.String],
          ['age', validation.Validation.Types.Number],
        ]);

        assert.isFalse(
            validation.validateFields('no-fields', {
              address: '123 1st St.',
            }));
      });
});
