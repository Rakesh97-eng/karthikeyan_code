import { Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import NotesEditor from '../../client-profile/notes-editor';
import { StyledRadioButton, StyledRadioWrapper, StyledLabel, NotesWrapper } from './styles';

interface IRadioButtonBody {
  id: string;
  name: string;
  value: string;
  label: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  mandatory: boolean;
  includeOtherVal: string;
  additionalNote: string;
  textChangeHandler: (editorData: string) => void;
}

const RadioButtonBodyWithTextField: FC<IRadioButtonBody> = ({
  id,
  name,
  value,
  label,
  onClick,
  onChange,
  checked,
  mandatory,
  includeOtherVal,
  additionalNote,
  textChangeHandler
}) => {
  const isOther =
    includeOtherVal !== '' && value === includeOtherVal && checked;

  return (
    <StyledRadioWrapper>
      <StyledRadioButton
        id={`${id}-${value}`}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        required={mandatory}
        type='radio'
        isother={isOther}
      />
      <StyledLabel htmlFor={`${id}-${value}`}>
        <Typography className='label-title' variant='btn'>{label}</Typography>
        {isOther && (
          <NotesWrapper>
            <NotesEditor notesData={additionalNote} handleChange={textChangeHandler} maxLengthVal={100} rowNum={1} />
          </NotesWrapper>
        )}
      </StyledLabel>
    </StyledRadioWrapper>
  );
};

export default RadioButtonBodyWithTextField;
