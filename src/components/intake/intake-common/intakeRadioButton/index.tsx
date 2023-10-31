import { FC, useContext, useEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { QuestionOptions } from '../../../../types/treatmentRecord/question';
import RadioButtonBody from './radioButtonBody';
import QuestionNote from '../../../common/QuestionNote';
import QuestionInfo from '../../../common/QuestionInfo';
import { IntakeFormState } from '../../../../types/store/form';
import { ErrorChip } from '../../../common/ErrorToast';
import { ERROR_MESSAGES } from '../../../../constants/errorConstant';
import { CustomerDetailsContext } from '../../../../providers/context/IntakeClientContext';

interface IRadioButton {
  id?: string;
  note?: string;
  label?: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  onChangeHandler: (data: IntakeFormState) => void;
  error?: boolean;
  selectedOptions?: string;
  questionId?: string;
}

const IntakeRadioButton: FC<IRadioButton> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  onChangeHandler,
  error = false,
  selectedOptions,
  questionId,
}) => {
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [selectedValue, setSelectedValue] = useState<string>(
    selectedOptions?.[0] ? selectedOptions[0] : ''
  );
  useEffect(() => {
    if (selectedOptions?.[0]) {
      setSelectedValue(selectedOptions[0]);
    }
  }, [selectedOptions]);
  //handling radio button state value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChangeHandler({
      question_id: id,
      answer: [event.target.value],
      other_answer: '',
    });
  };

  // for deselecting the selected option
  const handleClick = (currentSelectedOption?: string) => {
    if (selectedValue === currentSelectedOption) {
      setSelectedValue('');
      onChangeHandler({ question_id: id, answer: [], other_answer: '' });
    }
  };

  return (
    <Box>
      {(label || note || isError || mandatory) && (
        <Typography
          variant='body2'
          component='div'
          color={'var(--neutral-primary)'}
          className='section-label'
        >
          {label}
          {note && <QuestionNote note={note} />}
          {isError && <ErrorChip text={ERROR_MESSAGES.required} />}
        </Typography>
      )}
      {info && <QuestionInfo info={info} />}
      <FormControl fullWidth>
        {options?.map((option, index) => (
          <RadioButtonBody
            key={`radio-${id}-${index}`}
            id={`${id}-${option.value}`}
            name={questionId}
            value={option?.id}
            onChange={handleChange}
            onClick={() => handleClick(option?.id)}
            checked={selectedValue === option.id}
            mandatory={mandatory}
            label={option.label}
            subLabel={option.subLabel}
          />
        ))}
      </FormControl>
    </Box>
  );
};

export default IntakeRadioButton;
