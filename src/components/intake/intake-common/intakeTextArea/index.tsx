import { Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { IntakeFormState } from '../../../../types/store/form';
import QuestionNote from '../../../common/QuestionNote';
import QuestionInfo from '../../../common/QuestionInfo';
import { StyledBox, StyledCheckBox, StyledTextField } from './styles';
import { zipCodeValidator } from '../../../../utils/helper-functions/common';
import { CustomerDetailsContext } from '../../../../providers/context/IntakeClientContext';

interface Props {
  id?: string;
  note?: string;
  label?: string;
  info?: string;
  defaultError?: string;
  onChangeHandler: (data: IntakeFormState) => void;
  error?: boolean;
  upperTitle?: string;
  selectedOptions?: string;
  isDisabled?: boolean;
  selectedValue?: string;
  additionalLabel?: string;
  additionalLabelHandler?: (data: IntakeFormState) => void;
  placeholder?: string;
  validateType?: string;
  questionId?: string;
  otherAnswer?: string;
  mandatory: boolean;
}

const IntakeTextArea: React.FC<Props> = ({
  id,
  note,
  label,
  info,
  defaultError,
  onChangeHandler,
  children,
  error = false,
  selectedOptions,
  upperTitle,
  additionalLabel,
  placeholder,
  validateType,
  mandatory,
  otherAnswer,
}) => {
  // setting initial state
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [content, setContent] = useState<string>(
    children?.toString || selectedOptions || ''
  );

  const [errorTxt, setErrorTxt] = useState<boolean>(false);

  // this state is intentionally
  const [isChecked, setIsChecked] = useState<boolean>(
    otherAnswer === 'outside-us'
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    onChangeHandler({
      question_id: id,
      answer: [],
      other_answer: event.target.value,
    });
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler({
      question_id: id,
      answer: [],
      other_answer: target.checked ? 'outside-us' : '',
    });
    if (target.checked) {
      setContent('');
    }
    setIsChecked(!isChecked);
    setErrorTxt(false);
  };
  const validator = () => {
    if (content) {
      setErrorTxt(!zipCodeValidator(content));
      return;
    }
    setErrorTxt(false);
  };

  const onBlur = () => {
    if (validateType === 'ZipCode') {
      validator();
    }
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
        </Typography>
      )}
      {info && <QuestionInfo info={info} />}
      <StyledTextField
        name={id}
        fullWidth
        label={upperTitle}
        variant='standard'
        onChange={handleChange}
        className={'custom-styled'}
        value={content}
        focused
        isDisabled={isChecked}
        disabled={isChecked}
        placeholder={placeholder}
        onBlur={onBlur}
        inputProps={{
          maxlength: validateType === 'ZipCode' ? 10 : 100,
        }}
        error={isError || errorTxt}
      />
      {((errorTxt && defaultError) || error) && (
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
          variant='body1'
          component='div'
          className='check-box-wrapper'
        >
          <StyledCheckBox
            checked={isChecked}
            value={additionalLabel}
            onChange={onChange}
            className='check-box'
            style={{
              color: isChecked
                ? 'var(--accent-primary)'
                : 'var(--neutral-primary)',
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {additionalLabel}
        </Typography>
      )}
    </StyledBox>
  );
};

export default IntakeTextArea;
