import React, { useState, ChangeEvent, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import { QuestionOptions } from '../../../../types/treatmentRecord/question';
import CheckboxBody from './checkBoxBody';
import { StyledOptional } from '../../../../styles/global';
import QuestionInfo from '../../../common/QuestionInfo';
import QuestionNote from '../../../common/QuestionNote';
import { IntakeFormState } from '../../../../types/store/form';
import { ErrorChip } from '../../../common/ErrorToast';
import { ERROR_MESSAGES } from '../../../../constants/errorConstant';
import { INTAKE_DEFAULT_NONE } from '../../../../constants/appConstants';
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
  questionId?: string;
}

const IntakeCheckbox: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  options,
  multiRequire,
  onChangeHandler,
  error = false,
  selectedOptions,
  questionId,
  mandatory,
}) => {
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [checkedVal, setCheckedVal] = useState<string[]>(
    selectedOptions ? selectedOptions : []
  );
  useEffect(() => {
    if (selectedOptions) {
      setCheckedVal(selectedOptions);
    }
  }, [selectedOptions]);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      if (
        target.value === INTAKE_DEFAULT_NONE ||
        checkedVal.includes(INTAKE_DEFAULT_NONE)
      ) {
        onChangeHandler({
          question_id: id,
          answer: [...[target?.value]],
          other_answer: '',
        });
        setCheckedVal([...[target?.value]]);
      } else {
        onChangeHandler({
          question_id: id,
          answer: [...checkedVal, ...[target?.value]],
          other_answer: '',
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
          other_answer: '',
        });
        setCheckedVal(updatedState);
      }
    }
  };

  return (
    <StyledBox>
      <Typography
        variant='body1'
        component='div'
        color={'var(--neutral-primary)'}
        className={`${id}  label-txt`}
      >
        {label}
        {note && <QuestionNote note={note} />}
        {multiRequire && (
          <StyledOptional>(choose up to {multiRequire})</StyledOptional>
        )}
        {isError && <ErrorChip text={ERROR_MESSAGES.required} />}
      </Typography>
      {info ? <QuestionInfo info={info} /> : null}
      <div>
        {options?.length &&
          options.map((option, index) => {
            return (
              <CheckboxBody
                key={`checkbox-${id}-${index}`}
                id={`checkbox-${id}-${index}`}
                name={id}
                label={option?.label}
                value={option?.id}
                note={option?.note}
                checked={
                  option?.id ? checkedVal.indexOf(option.id) > -1 : false
                }
                onChange={onChange}
              />
            );
          })}
      </div>
    </StyledBox>
  );
};

export default IntakeCheckbox;
