import {describe, it} from 'mocha';
import {assert} from 'chai';

import * as validation from '../src/mongo/validation';

describe('Mongo model validation', function() {
  it('should accept a string on a field defined as string', function() {
    validation.register(
        'string-model',
        [
          ['field', validation.Validation.Types.String],
        ]);

    assert.isTrue(
        validation.validate(
            'string-model',
            {field: 'John Doe'}));
  });

  it('should accept a number on a field defined as number', function() {
    validation.register(
        'number-model',
        [
          ['field', validation.Validation.Types.Number],
        ]);

    assert.isTrue(
        validation.validate(
            'number-model',
            {field: 30}));
  });

  it('should accept a boolean on a field defined as boolean', function() {
    validation.register(
        'bool-model',
        [
          ['field', validation.Validation.Types.Boolean],
        ]);

    assert.isTrue(
        validation.validate(
            'bool-model',
            {field: true}));
  });

  it('should accept an array on a field defined as an array', function() {
    validation.register(
        'array-model',
        [
          ['field', validation.Validation.Types.Array],
        ]);

    assert.isTrue(
        validation.validate(
            'array-model',
            {field: [0, 1, 2]}));
  });

  it('should accept an object on a field defined as an object', function() {
    validation.register(
        'obj-model',
        [
          ['field', validation.Validation.Types.Object],
        ]);

    assert.isTrue(
        validation.validate(
            'obj-model',
            {
              field: {prop: 'value'},
            }));
  });

  it('should accept a string on a field defined as not null', function() {
    validation.register(
        'string-not-null-model',
        [
          ['field', validation.Validation.NotNull],
        ]);

    assert.isTrue(
        validation.validate(
            'string-not-null-model',
            {field: 'Plain Jane'}));
  });

  it('should accept a number on a field defined as not null', function() {
    validation.register(
        'number-not-null-model',
        [
          ['field', validation.Validation.NotNull],
        ]);

    assert.isTrue(
        validation.validate(
            'number-not-null-model',
            {field: 7}));
  });

  it('should accept a boolean on a field defined as not null', function() {
    validation.register(
        'bool-not-null-model',
        [
          ['field', validation.Validation.NotNull],
        ]);

    assert.isTrue(
        validation.validate(
            'bool-not-null-model',
            {field: true}));
  });

  it('should accept an array on a field defined as not null', function() {
    validation.register(
        'array-not-null-model',
        [
          ['field', validation.Validation.NotNull],
        ]);

    assert.isTrue(
        validation.validate(
            'array-not-null-model',
            {field: [3, 4, 5]}));
  });

  it('should accept an object on a field defined as not null', function() {
    validation.register(
        'obj-not-null-model',
        [
          ['field', validation.Validation.NotNull],
        ]);

    assert.isTrue(
        validation.validate(
            'obj-not-null-model',
            {field: {prop: 'value'}}));
  });

  it('should accept a string on a field defined as not empty', function() {
    validation.register(
        'string-not-empty-model',
        [
          ['field', validation.Validation.NotEmpty],
        ]);

    assert.isTrue(
        validation.validate(
            'string-not-empty-model',
            {field: 'text'}));
  });

  it('should accept an array on a field defined as not empty', function() {
    validation.register(
        'array-not-empty-model',
        [
          ['field', validation.Validation.NotEmpty],
        ]);

    assert.isTrue(
        validation.validate(
            'array-not-empty-model',
            {field: [6, 7]}));
  });

  it('should accept an object on a field defined as not empty', function() {
    validation.register(
        'obj-not-empty-model',
        [
          ['field', validation.Validation.NotEmpty],
        ]);

    assert.isTrue(
        validation.validate(
            'obj-not-empty-model',
            {field: {prop: 'value'}}));
  });
});
