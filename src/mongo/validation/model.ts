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
