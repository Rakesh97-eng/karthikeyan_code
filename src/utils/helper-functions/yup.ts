import { ValidationError, AnyObjectSchema } from 'yup';

/**
 * generateValidationErrorObject
 * create a validation error object from the catch error
 * @param validationError {ValidationError} - validation error object from the catch block
 * @returns errorObject {ErrorObject}
 */
export const generateValidationErrorObject = (
  validationError: ValidationError
) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error: ValidationError) => {
    return {
      ...errors,
      [error.path as string]: error.errors[FIRST_ERROR],
    };
  }, {});
};

/**
 * validateFormData
 * validates the form object and creates a error object based on ErrorObject type
 * or undefined if the form is valid
 * @param schema {AnyObjectSchema} - schema for validation
 * @param state {State} - state of the for object
 * @returns ErrorObject {ErrorObject} or undefined
 */
export const validateFormData = <State>(
  schema: AnyObjectSchema,
  state: State
) => {
  try {
    schema.validateSync(state, {
      abortEarly: false,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateValidationErrorObject(error);
    }
  }
  return undefined;
};
