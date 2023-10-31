import React, { useState, ChangeEvent, useContext } from 'react';
import { Typography } from '@mui/material';
import { QuestionOptions } from '../../../../types/treatmentRecord/question';
import CheckboxBodyWithTextField from './CheckboxBody';
import { StyledOptional } from '../../../../styles/global';
import QuestionInfo from '../../../common/QuestionInfo';
import QuestionNote from '../../../common/QuestionNote';
import { IntakeFormState } from '../../../../types/store/form';
import { ErrorChip } from '../../../common/ErrorToast';
import { ERROR_MESSAGES } from '../../../../constants/errorConstant';
import { INTAKE_DEFAULT_NONE,INTAKE_DEFAULT_OTHER } from '../../../../constants/appConstants';
import { StyledBox } from './styles';
import { CustomerDetailsContext } from '../../../../providers/context/IntakeClientContext';

interface Props {
  id?: string;
  note?: string;
  label?: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  multiRequire?: number;
  onChangeHandler: (data: IntakeFormState) => void;
  error?: boolean;
  selectedOptions?: string[];
  includeOtherVal: string;
  additionalResponse?: string;
  questionId?: string;
}

const IntakeCheckboxWithTextField: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  multiRequire,
  onChangeHandler,
  error = false,
  selectedOptions,
  includeOtherVal,
  additionalResponse,
}) => {
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [checkedVal, setCheckedVal] = useState<string[]>(
    selectedOptions ? selectedOptions : []
  );
  const [additionalNote, setAdditionalNote] = useState<string>(
    additionalResponse || ''
  );

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let textNoteForOther : string = additionalNote || ''
    if(target.value == INTAKE_DEFAULT_OTHER || target.value == INTAKE_DEFAULT_NONE){
      setAdditionalNote('');
      textNoteForOther=''
    }

    if (target.checked) {
      if (
        target.value === INTAKE_DEFAULT_NONE ||
        checkedVal.includes(INTAKE_DEFAULT_NONE)
      ) {
        onChangeHandler({
          question_id: id,
          answer: [...[target?.value]],
          other_answer: textNoteForOther,
        });
        setCheckedVal([...[target?.value]]);
      } else {
        onChangeHandler({
          question_id: id,
          answer: [...checkedVal, ...[target?.value]],
          other_answer: textNoteForOther,
        });
        setCheckedVal([...checkedVal, ...[target?.value]]);
      }
    } else {
      if (checkedVal.includes(target.value)) {
        const updatedState: string[] = checkedVal.filter(
          (item) => item !== target.value
        );
        onChangeHandler({
          question_id: id,
          answer: updatedState,
          other_answer: textNoteForOther,
        });
        setCheckedVal(updatedState);
      }
    }
  };

  const handleTextChange = (editorData: string) => {
    setAdditionalNote(editorData);
    onChangeHandler({
      question_id: id,
      answer: checkedVal,
      other_answer: editorData,
    });
  };

  return (
    <StyledBox>
      <Typography
        variant='body1'
        component='div'
        color={'var(--neutral-primary)'}
        className={`${id}  label-txt`}
      >
        <p>
          {label}
          {note && <QuestionNote note={note} />}
          {multiRequire && (
            <StyledOptional>(choose up to {multiRequire})</StyledOptional>
          )}
          {isError && <ErrorChip text={ERROR_MESSAGES.required} />}
        </p>
      </Typography>
      {info ? <QuestionInfo info={info} /> : null}
      <div>
        {options?.length &&
          options.map((option, index) => {
            return (
              <CheckboxBodyWithTextField
                key={`checkbox-${id}-${index}`}
                id={`checkbox-${id}-${index}`}
                name={id}
                label={option?.label}
                value={option?.id}
                checked={
                  option?.id ? checkedVal.indexOf(option.id) > -1 : false
                }
                onChange={onChange}
                includeOtherVal={includeOtherVal}
                textChangeHandler={handleTextChange}
                additionalNote={additionalNote}
              />
            );
          })}
      </div>
    </StyledBox>
  );
};

export default IntakeCheckboxWithTextField;
