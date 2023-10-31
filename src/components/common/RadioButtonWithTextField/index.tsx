import { FC, useEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { QuestionOptions } from '../../../types/treatmentRecord/question';
import QuestionNote from '../QuestionNote';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import QuestionInfo from '../QuestionInfo';
import { FormState } from '../../../types/store/form';
import { ErrorChip } from '../ErrorToast';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import RadioButtonBodyWithTextField from './RadioButtonBody';

interface IRadioButton {
  id: string;
  note?: string;
  label: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  onChangeHandler: (data: FormState) => void;
  textChangeHandler: (data: FormState) => void;
  error?: boolean;
  defaultSelectedValue?: string,
  includeOtherVal: string;
  additionalResponse?: string
}

const RadioButtonWithTextField: FC<IRadioButton> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  onChangeHandler,
  textChangeHandler,
  error = false,
  defaultSelectedValue,
  includeOtherVal,
  additionalResponse,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultSelectedValue ? defaultSelectedValue : ''
  );

  useEffect(() => {
    if (defaultSelectedValue) {
      setSelectedValue(defaultSelectedValue);
    }
  }, [defaultSelectedValue]);

  const [additionalNote, setAdditionalNote] = useState<string>(additionalResponse || '');

  useEffect(() => {
    if (additionalResponse) {
      setAdditionalNote(additionalResponse);
    }
  }, [additionalResponse]);

  //handling radio button state value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChangeHandler({ [id]: event.target.value });
  };

  // for deselecting the selected option
  const handleClick = (currentSelectedOption: string) => {
    if (selectedValue === currentSelectedOption) {
      setSelectedValue('');
      onChangeHandler({ [id]: '' });
    }
  };

  const handleTextChange = (editorData: string) => {
    setAdditionalNote(editorData);
    textChangeHandler({ [id]: editorData});
  };

  return (
    <Box className='questions-wrapper'>
      <Typography
        variant='body1'
        component='div'
        color={'var(--neutral-primary)'}
        fontWeight={400}
      >
        {label}
        {note && <QuestionNote note={note} />}
        {mandatory ? (
          <StyledMandatory> *</StyledMandatory>
        ) : (
          <StyledOptional>(optional)</StyledOptional>
        )}
        {error && <ErrorChip text={ERROR_MESSAGES.required} />}
      </Typography>
      {info && <QuestionInfo info={info} />}
      <FormControl fullWidth>
        {options?.map((option, index) => (
          <RadioButtonBodyWithTextField
            key={`radio-${id}-${index}`}
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            onChange={handleChange}
            onClick={() => handleClick(option.value)}
            checked={selectedValue === option.value}
            mandatory={mandatory}
            label={option.label}
            includeOtherVal={includeOtherVal}
            textChangeHandler={handleTextChange}
            additionalNote={additionalNote}
          />
        ))}
      </FormControl>
    </Box>
  );
};

export default RadioButtonWithTextField;
