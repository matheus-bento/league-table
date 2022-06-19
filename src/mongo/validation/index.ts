import * as model from './model';
import {Model, Validation} from './model';

type RegisteredModel = { name: string, model: model.Model };
const models: Array<RegisteredModel> = [];

/**
 * Validates an object field against default validation options.
 * @param {any} field The field value to be validated
 * @param {string} validation The validation to be applied. It should be present
 * in the {@link defaults} map
 * @return {boolean} Wheter or not the field complies with the validation
 */
function validateDefaultValidations(
    field: any,
    validation: string): boolean | undefined {
  const validationFunc = model.defaultValidations[validation];

  if (validationFunc !== undefined) {
    return validationFunc(field);
  } else {
    throw new Error(`Unknown validation of type "${validation}"`);
  }
}

/**
 * Registers a model that can be used for validation
 * @param {string} name Model name
 * @param {Model} model Model definition
 */
export function register(name: string, model: model.Model) {
  if (name === '') {
    throw new Error('The model name cannot be empty');
  }

  const existingModel: RegisteredModel | undefined =
      models.find((m) => m.name === name);

  if (existingModel !== undefined) {
    throw new Error(
        `A model named "${name} was already registered with the following
fields: ${JSON.stringify(existingModel)}`);
  }

  models.push({
    name: name,
    model: model,
  });
}

/**
 * Validates an object against the specified model, checking if every field
 * specified in the model is present in the object.
 * @param {string} modelName The name of the model to be used for validation
 * @param {any} obj The object to be validated
 * @return {boolean} Wheter or not the object is valid, according to the model
 */
export function validateModel(modelName: string, obj: any): boolean {
  const registeredModel = models.find((m) => m.name === modelName);

  if (registeredModel === undefined) {
    throw new Error(`No model named "${modelName}" was found`);
  }

  for (const field of registeredModel.model) {
    /*
      A simple string in the model only verifies if a field with this given
      name exists
    */
    if (typeof field === 'string') {
      if (!obj.hasOwnProperty(field)) {
        return false;
      }
    } else if (model.isSimpleValidation(field)) {
      const name: string = field[0];
      if (!obj.hasOwnProperty(name)) {
        return false;
      }

      const validations: string | string[] = field[1];
      if (typeof validations === 'string') {
        if (!validateDefaultValidations(obj[name], validations)) {
          return false;
        }
      } else {
        for (const validation of validations) {
          if (!validateDefaultValidations(obj[name], validation)) {
            return false;
          }
        }
      }
    } else if (model.isCustomValidation(field)) {
      const name: string = field[0];
      if (!obj.hasOwnProperty(name)) {
        return false;
      }

      const validationFunction = field[1];
      if (!validationFunction(obj[name], obj)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Verifies if the fields of a given object matches a field on a model.
 *
 * For a full object verification against a model use validateModel.
 * @param {string} modelName The name of the model to be used for validation
 * @param {any} obj The object to be validated
 * @return {boolean} Wheter or not the object fields are valid, according to the
 * specified model
 */
export function validateFields(modelName: string, obj: any): boolean {
  const registeredModel = models.find((m) => m.name === modelName);

  if (registeredModel === undefined) {
    throw new Error(`No model named "${modelName}" was found`);
  }

  for (const field of Object.keys(obj)) {
    let isFieldValid = false;

    for (const modelField of registeredModel.model) {
      /*
        A simple string in the model only verifies if a field with this given
        name exists
      */
      if (typeof modelField === 'string') {
        if (obj.hasOwnProperty(modelField)) {
          isFieldValid = true;
        }
      } else if (model.isSimpleValidation(modelField)) {
        const name: string = modelField[0];
        if (!obj.hasOwnProperty(name)) {
          continue;
        }

        const validations: string | string[] = modelField[1];
        if (typeof validations === 'string') {
          if (validateDefaultValidations(obj[field], validations)) {
            isFieldValid = true;
          }
        } else {
          for (const validation of validations) {
            if (validateDefaultValidations(obj[field], validation)) {
              isFieldValid = true;
            }
          }
        }
      } else if (model.isCustomValidation(modelField)) {
        const name: string = modelField[0];
        if (!obj.hasOwnProperty(name)) {
          continue;
        }

        const validationFunction = modelField[1];
        if (validationFunction(obj[field], obj)) {
          isFieldValid = true;
        }
      }

      /*
        If a field is valid according to a given model rule, we can go to the
        next key in the object.
       */
      if (isFieldValid) {
        break;
      }
    }

    /*
      If the field isn't valid according to any of the model rules, the object
      is invalid
    */
    if (!isFieldValid) {
      return false;
    }
  }

  return true;
}

export {Validation, Model};
