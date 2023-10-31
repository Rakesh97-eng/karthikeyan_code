import { updateForm } from '../../../store/form/formAction';
import { Note } from '../../../types/services/Note';
import { FormState, TFormContext } from '../../../types/store/form';
import {
  Element,
  SectionElementTypes,
} from '../../../types/treatmentRecord/question';
import Checkbox from '../Checkbox';
import MultiCollapse from '../MultiCollapse';
import RadioButton from '../RadioButton';
import TextArea from '../TextArea';

const getFormElements = (
  sectionElement: Element,
  { formDispatch, formState }: TFormContext,
  prefilledData?: Partial<FormState>
) => {
  const generalNotes = prefilledData?.note
    ?.filter((val: Partial<FormState>) => val?.type === 'general_notes' && val?.text?.length > 0)
    .slice(0, 1);
  const generalNotesText =
    generalNotes?.length != 0
      ? generalNotes?.map((data: Note) => data.text).toString()
      : '';
  const updateFormState = (data: FormState) => {
    formDispatch(updateForm(data));
  };
  switch (sectionElement.type) {
    case SectionElementTypes.radio:
      return (
        <RadioButton
          {...sectionElement}
          onChangeHandler={updateFormState}
          error={
            formState.errors ? !!formState.errors[sectionElement.id] : false
          }
          defaultSelectedValue={
            prefilledData ? prefilledData[sectionElement.id] : null
          }
        />
      );
    case SectionElementTypes.checkbox:
      return (
        <Checkbox
          {...sectionElement}
          onChangeHandler={updateFormState}
          error={
            formState.errors ? !!formState.errors[sectionElement.id] : false
          }
          selectedValue={
            prefilledData ? prefilledData[sectionElement.id] : null
          }
          prefilledData={prefilledData}
        />
      );
    case SectionElementTypes.textarea:
      return (
        <TextArea
          {...sectionElement}
          onChangeHandler={updateFormState}
          selectedValue={generalNotesText}
        />
      );
    case SectionElementTypes.multiCollapse:
      return (
        <MultiCollapse {...sectionElement} onChangeHandler={updateFormState} />
      );
    case SectionElementTypes.text:
      return (
        <TextArea
          {...sectionElement}
          onChangeHandler={updateFormState}
          selectedValue={
            prefilledData ? prefilledData[sectionElement.id] : null
          }
          multiLineEnable={false}
        />
      );
    default:
      return null;
  }
};

export default getFormElements;
