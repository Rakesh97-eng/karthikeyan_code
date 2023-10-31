import { Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { ReactComponent as DataIcon } from '../../../../assets/icons/intake-icons/intake-calender.svg';
import { ERROR_MESSAGES } from '../../../../constants/errorConstant';
import { CustomerDetailsContext } from '../../../../providers/context/IntakeClientContext';
import { IntakeFormState } from '../../../../types/store/form';
import { ErrorChip } from '../../../common/ErrorToast';
import QuestionInfo from '../../../common/QuestionInfo';
import QuestionNote from '../../../common/QuestionNote';
import { StyledBox, StyledDateTextField } from './styles';

interface Props {
  id?: string;
  note?: string;
  label?: string;
  info?: string;
  mandatory: boolean;
  defaultError?: string;
  onChangeHandler: (data: IntakeFormState) => void;
  error?: boolean;
  multiLineEnable?: boolean;
  upperTitle?: string;
  selectedOptions?: string;
  questionId?: string;
}

const IntakeDateField: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  mandatory,
  defaultError,
  onChangeHandler,
  error = false,
  selectedOptions,
  upperTitle,
  questionId,
}) => {
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [defaultValue, setDefaultValue] = useState<Date | null>(
    selectedOptions ? new Date(selectedOptions) : null
  );
  const handleChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDefaultValue(new Date(selectedDate));
    }
  };
  const dateHandlerBlur = () => {
    onChangeHandler({
      question_id: id,
      answer: [],
      other_answer: dayjs(defaultValue).format('MM/DD/YYYY'),
    });
  };
  return (
    <StyledBox>
      {(label || note || isError) && (
        <Typography
          variant='body2'
          component='div'
          color={'var(--neutral-primary)'}
          className='section-label'
        >
          {label}
          {note && <QuestionNote note={note} />}
          {error && <ErrorChip text={ERROR_MESSAGES.valid} />}
        </Typography>
      )}
      {info && <QuestionInfo info={info} />}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={upperTitle}
          value={defaultValue}
          onChange={handleChange}
          maxDate={new Date()}
          className={isError ? 'error-date-picker' : 'date-picker'}
          components={{ OpenPickerIcon: DataIcon }}
          onError={() => true}
          onClose={dateHandlerBlur}
          renderInput={(params) => (
            <StyledDateTextField
              variant='standard'
              focused
              fullWidth
              {...params}
              onBlur={dateHandlerBlur}
            />
          )}
        />
      </LocalizationProvider>
      {isError && (
        <Typography
          variant='body2'
          component='div'
          color={'var(--negative-primary)'}
          style={{ marginTop: '8px' }}
        >
          {defaultError}
        </Typography>
      )}
    </StyledBox>
  );
};

export default IntakeDateField;
