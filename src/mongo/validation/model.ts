/**
 * List of default validation types
 */
export const Validation = {
  Types: {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Array: 'array',
    Object: 'object',
  },
  NotNull: 'not null',
  NotEmpty: 'not empty',
};

/**
 * A map containing the default validations that can be used on model
 * definitions
 */
export const defaultValidations: {[key: string]: (field: any) => boolean} = {
  [Validation.Types.String]: (field: any) => typeof field === 'string',
  [Validation.Types.Number]: (field: any) => typeof field === 'number',
  [Validation.Types.Boolean]: (field: any) => typeof field === 'boolean',
  [Validation.Types.Array]: (field: any) => field instanceof Array,
  [Validation.Types.Object]: (field: any) => field instanceof Object,
  [Validation.NotNull]: (field: any) => field !== null,
  [Validation.NotEmpty]:
      (field: any) => {
        if (typeof field === 'string') {
          return field !== '';
        } else if (field instanceof Array) {
          return field.length > 0;
        } else if (field instanceof Object) {
          return Object.getOwnPropertyNames(field).length > 0;
        }

        /*
          If the field is not of a type that can be empty, it is a valid non
          empty field
        */
        return true;
      },
};

/**
 * An array that defines a set of default validations to be performed on a
 * field.
 *
 * Example:
 *
 *     ['name', 'string']
 *     ['name', ['string', 'not null', 'not empty']]
 */
export type SimpleValidation = [string, string | Array<string>];

export const isSimpleValidation =
  (x: any): x is SimpleValidation => (x as SimpleValidation) !== undefined;

/**
 * An array that defines a custom validation function to be performed on a
 * field.
 *
 * Example:
 *
 *     ['messages', (record) => record instanceof Array && record.length <= 10]
 */
export type CustomValidation = [string, (field: any, obj?: any) => boolean];

export const isCustomValidation =
  (x: any): x is CustomValidation => (x as CustomValidation) !== undefined;

/**
 * Defines a model with validations for its fields.
 *
 * Example:
 *
 *     const person = [
 *         ['name', ['string', 'not null', 'not empty']],
 *         ['age', ['number', 'not null']],
 *         ['address', 'string']
 *     ]
 */
export type Model = Array<string | SimpleValidation | CustomValidation>;
