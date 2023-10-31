import { FC, useContext, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
import { QuestionOptions } from '../../../../types/treatmentRecord/question';
import QuestionNote from '../../../common/QuestionNote';
import QuestionInfo from '../../../common/QuestionInfo';
import { IntakeFormState } from '../../../../types/store/form';
import { ErrorChip } from '../../../common/ErrorToast';
import { ERROR_MESSAGES } from '../../../../constants/errorConstant';
import RadioButtonBodyWithTextField from './RadioButtonBody';
import { CustomerDetailsContext } from '../../../../providers/context/IntakeClientContext';
import { INTAKE_YES } from '../../../../constants/appConstants';

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
  includeOtherVal: string;
  additionalResponse?: string;
  questionId?: string;
  otherAnswer?: string;
}

const IntakeRadioButtonWithTextField: FC<IRadioButton> = ({
  id,
  note,
  label,
  info,
  options,
  mandatory,
  onChangeHandler,
  error = false,
  selectedOptions,
  otherAnswer,
  includeOtherVal,
  additionalResponse,
  questionId,
}) => {
  const { errorQuestionData } = useContext(CustomerDetailsContext);
  const isError = id ? errorQuestionData.indexOf(id) > -1 : false;
  const [selectedValue, setSelectedValue] = useState<string>(
    selectedOptions?.[0] ? selectedOptions[0] : ''
  );
  const [additionalNote, setAdditionalNote] = useState<string | undefined>(
    additionalResponse || otherAnswer
  );
  //handling radio button state value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let textNoteForOther : string = additionalNote || ''
    if(event.target.value !== INTAKE_YES){
      setAdditionalNote('');
      textNoteForOther=''
    }
    setSelectedValue(event.target.value);
    onChangeHandler({
      question_id: id,
      answer: [event.target.value],
      other_answer: textNoteForOther,
    });
  };

  // for deselecting the selected option
  const handleClick = (currentSelectedOption?: string) => {
    if (selectedValue === currentSelectedOption) {
      setSelectedValue('');
      onChangeHandler({ question_id: id, answer: [], other_answer: '' });
    }
  };

  const handleTextChange = (editorData: string) => {
    setAdditionalNote(editorData);
    onChangeHandler({
      question_id: id,
      answer: [selectedValue],
      other_answer: editorData,
    });
  };

  return (
    <Box className='questions-wrapper'>
      {(label || note || isError) && (
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
          <RadioButtonBodyWithTextField
            key={`radio-${id}-${index}`}
            id={`${id}-${option.value}`}
            name={id}
            value={option?.id}
            onChange={handleChange}
            onClick={() => handleClick(option?.id)}
            checked={selectedValue === option.id}
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

export default IntakeRadioButtonWithTextField;
