import React, { useState, ChangeEvent, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionOptions } from '../../../types/treatmentRecord/question';
import CheckboxBodyWithTextField from './CheckboxBody';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import QuestionNote from '../QuestionNote';
import QuestionInfo from '../QuestionInfo';
import { FormState } from '../../../types/store/form';
import { ErrorChip } from '../ErrorToast';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { ELEMENT_ID } from '../../../constants/enums';
import { INTAKE_DEFAULT_NONE } from '../../../constants/appConstants';

interface Props {
  id: string;
  note?: string;
  label: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  multiRequire?: number;
  onChangeHandler: (data: FormState) => void;
  error?: boolean;
  selectedValue?: string[];
  includeOtherVal: string;
  textChangeHandler: (data: FormState) => void;
  additionalResponse?: string;
}

const CheckboxWithTextField: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  multiRequire,
  onChangeHandler,
  error = false,
  selectedValue,
  includeOtherVal,
  textChangeHandler,
  additionalResponse,
}) => {
  const [checkedVal, setCheckedVal] = useState<string[]>(
    selectedValue ? selectedValue : []
  );

  useEffect(() => {
    if (selectedValue) {
      setCheckedVal(selectedValue.filter( (value) => { return value != '' }));
    }
  }, [selectedValue]);

  const [additionalNote, setAdditionalNote] = useState<string>(
    additionalResponse || ''
  );

  useEffect(() => {
    if (additionalResponse) {
      setAdditionalNote(additionalResponse);
    }
  }, [additionalResponse]);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      if (target.value === INTAKE_DEFAULT_NONE || checkedVal.includes(INTAKE_DEFAULT_NONE)) {
        onChangeHandler({
          [id]: [...[target?.value]],
        });
        setCheckedVal([...[target?.value]]);
      } else {
        onChangeHandler({
          [id]: [...checkedVal, ...[target?.value]],
        });
        setCheckedVal([...checkedVal, ...[target?.value]]);
      }
    } else {
      if (checkedVal.includes(target.value)) {
        const updatedState: string[] = checkedVal.filter(
          (item) => item !== target.value
        );
        onChangeHandler({ [id]: updatedState });
        setCheckedVal(updatedState);
      }
    }
  };

  const handleTextChange = (editorData: string) => {
    setAdditionalNote(editorData);
    textChangeHandler({ [id]: editorData });
  };

  return (
    <Box className='questions-wrapper'>
      <Typography
        variant='body1'
        component='div'
        color={'var(--neutral-primary)'}
        className={id}
      >
        <p>
          {label}
          {note && <QuestionNote note={note} />}
          {multiRequire && (
            <StyledOptional>(choose up to {multiRequire})</StyledOptional>
          )}
          {mandatory ? (
            <StyledMandatory> *</StyledMandatory>
          ) : (
            id !== ELEMENT_ID.MANAGE_CLIENT_PREFERENCES && (
              <StyledOptional>(optional)</StyledOptional>
            )
          )}
          {error && <ErrorChip text={ERROR_MESSAGES.required} />}
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
                value={option?.value}
                checked={checkedVal.includes(option?.value)}
                onChange={onChange}
                includeOtherVal={includeOtherVal}
                textChangeHandler={handleTextChange}
                additionalNote={additionalNote}
              />
            );
          })}
      </div>
    </Box>
  );
};

export default CheckboxWithTextField;
