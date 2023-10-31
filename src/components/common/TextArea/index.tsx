import { Box, Checkbox, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { OUTSIDE_US } from '../../../constants/appConstants';
import { ERROR_MESSAGES } from '../../../constants/errorConstant';
import { StyledMandatory, StyledOptional } from '../../../styles/global';
import { FormState } from '../../../types/store/form';
import { debounceInput } from '../../../utils/helper-functions/debounce';
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
  isDisabled?: boolean;
  additionalLabel?: string;
  additionalLabelHandler?: (data: FormState) => void;
}

const TextArea: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  mandatory,
  defaultError,
  onChangeHandler,
  additionalLabelHandler,
  children,
  error = false,
  selectedValue,
  multiLineEnable = true,
  upperTitle,
  isDisabled = false,
  additionalLabel,
  ...props
}) => {
  // setting initial state
  const [content, setContent] = useState<string>(
    children?.toString || selectedValue || ''
  );

  useEffect(() => {
    if (selectedValue) {
      setContent(selectedValue == OUTSIDE_US ? '' : selectedValue);
    }
  }, [selectedValue]);

  const debounceFunc = useRef(debounceInput(onChangeHandler, 300));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    debounceFunc.current({ [id]: event.target.value });
    if (additionalLabelHandler != undefined) {
      additionalLabelHandler({ [id]: event.target.value });
    }
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (additionalLabelHandler != undefined) {
      additionalLabelHandler({ [id]: target.checked ? OUTSIDE_US : '' });
      if (target.checked) setContent('');
    }
  };

  return (
    <Box className='questions-wrapper'>
      {(label || note) && (
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
      )}
      {info && <QuestionInfo info={info} />}
      {multiLineEnable ? (
        <StyledTextField
          name={id}
          fullWidth
          multiline
          rows={5}
          onChange={handleChange}
          value={content}
        />
      ) : (
        <StyledTextField
          name={id}
          fullWidth
          label={upperTitle}
          variant='standard'
          onChange={handleChange}
          className='custom-styled'
          value={content}
          focused
          isDisabled={isDisabled}
          disabled={isDisabled}
          {...props}
        />
      )}
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
      {additionalLabel && (
        <Typography
          variant='body2'
          component='div'
          className='check-box-wrapper'
        >
          <Checkbox
            checked={isDisabled}
            value={additionalLabel}
            onChange={onChange}
            className='check-box'
            style={{
              color: isDisabled
                ? 'var(--accent-primary)'
                : 'var(--neutral-secondary-darker)',
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {additionalLabel}
        </Typography>
      )}
    </Box>
  );
};

export default TextArea;
