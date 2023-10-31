import { FormDispatch, FormState } from '../../types/store/form';
import { FORM_ACTION_TYPES } from './types';

export const updateForm = (updatedState: FormState): FormDispatch => {
  return {
    type: FORM_ACTION_TYPES.UPDATE_FORM,
    payload: updatedState,
  };
};
