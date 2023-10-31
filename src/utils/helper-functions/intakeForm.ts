import { IntakeSectionTypes } from '../../types/treatmentRecord/question';
import { IntakeFormState } from '../../types/store/form';

export const radioWithTextfieldValidation = (
  a: IntakeSectionTypes,
  userSelections: IntakeFormState[],
  optionId: string
) => {
  const dataIndex = userSelections.findIndex((k) => {
    return k.question_id === a.id;
  });
  if (dataIndex === -1) {
    return true;
  }
  if (optionId === userSelections[dataIndex].answer[0]) {
    return userSelections[dataIndex].other_answer.length > 0 ? false : true;
  }
};
