import { FC, useEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { QuestionOptions } from '../../../types/treatmentRecord/question';
import RadioButtonBody from './RadioButtonBody';
import QuestionNote from '../QuestionNote';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import QuestionInfo from '../QuestionInfo';
import { FormState } from '../../../types/store/form';
import { ErrorChip } from '../ErrorToast';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { ItalicText, LabelsWrapper } from '../FormElement/styles';

interface IRadioButton {
  id: string;
  note?: string;
  label: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  onChangeHandler: (data: FormState) => void;
  error?: boolean;
  defaultSelectedValue?: string;
  infoItalic?: boolean;
}

const RadioButton: FC<IRadioButton> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  onChangeHandler,
  error = false,
  defaultSelectedValue,
  infoItalic,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultSelectedValue ? defaultSelectedValue : ''
  );
  useEffect(() => {
    if (defaultSelectedValue) {
      setSelectedValue(defaultSelectedValue);
    }
  }, [defaultSelectedValue]);
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

  return (
    <Box className='questions-wrapper'>
      <LabelsWrapper fontWeight={400}>
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
        {info ? (
          infoItalic ? (
            <ItalicText>
              <QuestionInfo info={info} />
            </ItalicText>
          ) : (
            <QuestionInfo info={info} />
          )
        ) : null}
      </LabelsWrapper>

      <FormControl fullWidth>
        {options?.map((option, index) => (
          <RadioButtonBody
            key={`radio-${id}-${index}`}
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            onChange={handleChange}
            onClick={() => handleClick(option.value)}
            checked={selectedValue === option.value}
            mandatory={mandatory}
            label={option.label}
          />
        ))}
      </FormControl>
    </Box>
  );
};

export default RadioButton;
