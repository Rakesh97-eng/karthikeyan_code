import { useReducer } from 'react';
import { FormState } from '../../types/store/form';
import formReducer from './formReducer';

const initialState: FormState = {};

const useFormState = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  return { formState, formDispatch };
};
export default useFormState;
