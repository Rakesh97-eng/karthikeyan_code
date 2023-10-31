import { FormDispatch, FormState } from '../../types/store/form';
import { setFirestoreDoc } from '../../firebase';
import { FORM_ACTION_TYPES } from './types';
import { validateFormData } from '../../utils/helper-functions/yup';
import { treatmentRecordSchema } from '../../utils/yup-schema/treatmentRecord';

const formReducer = (state: FormState, action: FormDispatch): FormState => {
  if (action.type === FORM_ACTION_TYPES.UPDATE_FORM) {
    const newFormState = {
      ...state,
      ...action.payload,
    };
    if (state.id) {
      setFirestoreDoc(state.id, {
        ...state,
        ...action.payload,
      });
    }
    if (newFormState.errors) {
      newFormState.errors = validateFormData<FormState>(
        treatmentRecordSchema,
        newFormState
      );
    }
    return newFormState;
  } else {
    return state;
  }
};
export default formReducer;
