import { Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import IntakeNotesEditor from '../intake-notes-editor';
import { ReactComponent as DownL } from '../../../../assets/icons/intake-icons/down-L.svg';
import {
  StyledRadioButton,
  StyledRadioWrapper,
  StyledLabel,
  NotesWrapper,
} from './styles';
import { NotesContainer } from '../intake-notes-editor/styles';

interface IRadioButtonBody {
  id?: string;
  name?: string;
  value?: string;
  label: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  mandatory: boolean;
  includeOtherVal: string;
  additionalNote?: string;
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
  textChangeHandler,
}) => {
  const isOther =
    includeOtherVal !== '' && value === includeOtherVal && checked;

  return (
    <>
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
        />
        <StyledLabel htmlFor={`${id}-${value}`}>
          <Typography className='label-title' variant='btn'>
            {label}
          </Typography>
        </StyledLabel>
      </StyledRadioWrapper>
      {isOther && (
        <NotesContainer>
          <DownL />
          <NotesWrapper>
            <IntakeNotesEditor
              notesData={additionalNote ?? ''}
              handleChange={textChangeHandler}
              maxLengthVal={100}
              rowNum={1}
            />
          </NotesWrapper>
        </NotesContainer>
      )}
    </>
  );
};

export default RadioButtonBodyWithTextField;
