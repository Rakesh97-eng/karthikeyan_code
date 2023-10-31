import { createContext } from 'react';
import { TFormContext } from '../../types/store/form';

const FormContext = createContext<TFormContext>({
  formState: {},
  formDispatch: () => ({}),
});

export default FormContext;
