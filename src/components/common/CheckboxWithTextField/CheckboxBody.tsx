import React, { ChangeEvent } from 'react';
import { Typography } from '@mui/material';
import {
  StyledCheckboxLabelWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
  NotesWrapper,
} from './styles';
import NotesEditor from '../../client-profile/notes-editor';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  isDisabled?: boolean;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  includeOtherVal: string;
  additionalNote: string;
  textChangeHandler: (editorData: string) => void;

}
const CheckboxBodyWithTextField: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  isDisabled,
  checked,
  onChange,
  includeOtherVal,
  additionalNote,
  textChangeHandler,
 
}) => {
  const isOther = includeOtherVal !== '' && value === includeOtherVal && checked;
  return (
    <StyledCheckboxLabelWrapper>
      <StyledCheckboxInput
        name={name}
        id={id}
        type={'checkbox'}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
        isother={isOther}
        
      />
      <StyledCheckboxLabel isother={isOther} htmlFor={id} checked={checked}>
        <Typography className='label-title' variant='btn' fontWeight={700}>{label}</Typography>
        {
          isOther && (
            <NotesWrapper>
              <NotesEditor notesData={additionalNote} handleChange={textChangeHandler} maxLengthVal={300} rowNum={1} />
            </NotesWrapper>
          )
        }
      </StyledCheckboxLabel>
    </StyledCheckboxLabelWrapper>
  );
};

export default CheckboxBodyWithTextField;
