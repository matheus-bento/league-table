import {isCustomValidation, isSimpleValidation, Model} from './model';

type RegisteredModel = { name: string, model: Model };
const models: Array<RegisteredModel> = [];

/**
 * Validates an object field against default validation options.
 * @param {any} obj Object that contains the field to be validated
 * @param {string} field The name of the field to be validated
 * @param {string} validation The validation to be applied
 * @return {boolean} Wheter or not the field complies with the validation
 */
function validateDefaultValidations(
    obj: any,
    field: string,
    validation: string): boolean | undefined {
  if (validation === 'string') {
    return typeof obj[field] === 'string';
  } else if (validation === 'number') {
    return typeof obj[field] === 'number' || typeof obj[field] === 'bigint';
  } else if (validation === 'boolean') {
    return typeof obj[field] === 'boolean';
  } else if (validation === 'array') {
    return obj[field] instanceof Array;
  } else if (validation === 'object') {
    return obj[field] instanceof Object;
  } else if (validation === 'not null') {
    return obj[field] !== null;
  } else if (validation === 'not empty') {
    if (typeof obj[field] === 'string') {
      return obj[field] !== '';
    } else if (obj[field] instanceof Array) {
      return obj[field].length > 0;
    } else if (obj[field] instanceof Object) {
      return Object.getOwnPropertyNames(obj[field]).length > 0;
    }

    /*
      if the field is not of a type that can be empty, it is a valid non empty
      field
    */
    return true;
  } else {
    throw new Error(`Unknown validation of type "${validation}"`);
  }
}

/**
 * Registers a model that can be used for validation
 * @param {string} name Model name
 * @param {Model} model Model definition
 */
export function register(name: string, model: Model) {
  if (name === '') {
    throw new Error('The model name cannot be empty');
  }

  models.push({
    name: name,
    model: model,
  });
}

/**
 * Validates an object against the specified model.
 * @param {string} modelName The name of the model to be used for validation
 * @param {any} obj The object to be validated
 * @return {boolean} Wheter or not the object is valid, according to the model
 */
export function validate(modelName: string, obj: any): boolean {
  const registeredModel = models.find((m) => m.name === modelName);

  if (registeredModel === undefined) {
    throw new Error(`No model named "${modelName}" was found`);
  }

  const model = registeredModel.model;

  for (const field of model) {
    /*
      A simple string in the model only verifies if a field with this given
      name exists
    */
    if (typeof field === 'string') {
      if (!obj.hasOwnProperty(field)) {
        return false;
      }
    } else if (isSimpleValidation(field)) {
      const name: string = field[0];
      if (!obj.hasOwnProperty(name)) {
        return false;
      }

      const validations: string | string[] = field[1];
      if (typeof validations === 'string') {
        if (!validateDefaultValidations(obj, name, validations)) {
          return false;
        }
      } else {
        for (const validation of validations) {
          if (!validateDefaultValidations(obj, name, validation)) {
            return false;
          }
        }
      }
    } else if (isCustomValidation(field)) {
      const name: string = field[0];
      if (!obj.hasOwnProperty(name)) {
        return false;
      }

      const validationFunction = field[1];
      if (!validationFunction(obj)) {
        return false;
      }
    }
  }

  return true;
}
