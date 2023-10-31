import { Box, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import { FormState } from '../../../types/store/form';
import { ErrorChip } from '../ErrorToast';
import QuestionInfo from '../QuestionInfo';
import QuestionNote from '../QuestionNote';
import { StyledTextField } from './styles';

interface Props {
  id: string;
  note?: string;
  label: string;
  info?: string;
  mandatory: boolean;
  defaultError?: string;
  onChangeHandler: (data: FormState) => void;
  error?: boolean;
  multiLineEnable?: boolean;
  upperTitle?: string;
  selectedValue?: string;
  additionalLabelHandler?: (data: FormState) => void;
}

const DateField: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  mandatory,
  defaultError,
  selectedValue,
  onChangeHandler,
  error = false,
  upperTitle,
  additionalLabelHandler
}) => {
  const [defaultValue, setDefaultValue] = useState<Date | null>(null);
  const [hasDefaultDate,setHasDefaultDate] = useState(true);

  useEffect(() => {
    if (selectedValue && hasDefaultDate) {
      setDefaultValue(new Date(selectedValue));
    }
  }, [selectedValue && hasDefaultDate]);

  const handleChange = (selectedDate: Date | null) => {
    setHasDefaultDate(false)
    setDefaultValue(selectedDate);
    onChangeHandler({ [id]: selectedDate });
    if (additionalLabelHandler != undefined) {
      additionalLabelHandler({ [id]: selectedDate });
    }
  };

  return (
    <Box className='questions-wrapper'>
      <Typography
        variant='body1'
        component='div'
        color={'var(--neutral-primary)'}
        fontWeight={400}
      >
        <p>
          {label}
          {note && <QuestionNote note={note} />}
          {mandatory ? (
            <StyledMandatory> *</StyledMandatory>
          ) : (
            <StyledOptional>(optional)</StyledOptional>
          )}
          {error && <ErrorChip text={ERROR_MESSAGES.required} />}
        </p>
      </Typography>
      {info && <QuestionInfo info={info} />}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={upperTitle}
          value={defaultValue}
          onChange={handleChange}
          maxDate={new Date()}
          renderInput={(params) => (
            <StyledTextField
              variant='standard'
              focused
              fullWidth
              {...params}
              className={'custom-styled'}
            />
          )}
        />
      </LocalizationProvider>
      {error && defaultError && (
        <Typography
          variant='body2'
          component='div'
          color={'var(--negative-primary)'}
          style={{ marginTop: '8px' }}
        >
          {defaultError}
        </Typography>
      )}
    </Box>
  );
};

export default DateField;
