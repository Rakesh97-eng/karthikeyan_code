import React from 'react';
import useFormState from './useFormState';
import Formcontext from './formContext';

const FormStateProvider: React.FC = ({ children }) => (
  <Formcontext.Provider value={useFormState()}>{children}</Formcontext.Provider>
);
export default FormStateProvider;
