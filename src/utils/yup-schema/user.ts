import { object, string } from 'yup';

export const userSignUpSchema = object().shape({
  email: string().required().email('please enter a valid email'),
  firstName: string().required('please enter first name'),
  lastName: string().required('please enter last name'),
  phoneNumber: string().required('please enter phone number'),
  password: string()
    .required('please enter the password')
    .test('Validity', 'please enter atleast 5 characters', (value) => {
      if (value) {
        return value?.length >= 5;
      }
      return false;
    }),
  confirmPassword: string()
    .required()
    .test('Validity', 'please enter atleast 5 characters', (value) => {
      if (value) {
        return value?.length >= 5;
      }
      return false;
    }),
});

export const userSignInSchema = object().shape({
  email: string().required().email('please enter a valid email'),
  password: string()
    .required('please enter the password')
    .test('Validity', 'please enter atleast 5 characters', (value) => {
      if (value) {
        return value?.length >= 5;
      }
      return false;
    }),
});

export const forgotPasswordSchema = object().shape({
  email: string()
    .required('please enter an email')
    .email('please enter a valid email'),
});
