import React, { ChangeEvent } from 'react';
import { Typography } from '@mui/material';
import {
  StyledCheckboxLabelWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
  NotesWrapper,
} from './styles';
import IntakeNotesEditor from '../intake-notes-editor';
import { NotesContainer } from '../intake-notes-editor/styles';
import { ReactComponent as DownL } from '../../../../assets/icons/intake-icons/down-L.svg';

interface Props {
  id?: string;
  name?: string;
  label: string;
  value?: string;
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
  const isOther =
    includeOtherVal !== '' && value === includeOtherVal && checked;
  return (
    <>
      <StyledCheckboxLabelWrapper>
        <StyledCheckboxInput
          name={name}
          id={id}
          type={'checkbox'}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          isOther={isOther}
        />
        <StyledCheckboxLabel isOther={isOther} htmlFor={id} checked={checked}>
          <Typography className='label-title' variant='btn' fontWeight={700}>
            {label}
          </Typography>
        </StyledCheckboxLabel>
      </StyledCheckboxLabelWrapper>
      {isOther && (
        <NotesContainer>
          <DownL />
          <NotesWrapper>
            <IntakeNotesEditor
              notesData={additionalNote}
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

export default CheckboxBodyWithTextField;
