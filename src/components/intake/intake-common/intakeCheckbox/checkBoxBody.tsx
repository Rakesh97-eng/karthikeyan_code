import React, { ChangeEvent } from 'react';
import { Typography } from '@mui/material';
import {
  StyledCheckboxLabelWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
  NoteSection,
} from './styles';

interface Props {
  id?: string;
  name?: string;
  label: string;
  value?: string;
  isDisabled?: boolean;
  note?: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxBody: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  isDisabled,
  note,
  checked,
  onChange,
}) => {
  return (
    <>
      <StyledCheckboxLabelWrapper>
        <StyledCheckboxLabel htmlFor={id} checked={checked}>
          <Typography variant='btn' fontWeight={700}>
            {label}
          </Typography>
        </StyledCheckboxLabel>
        <StyledCheckboxInput
          name={name}
          id={id}
          type={'checkbox'}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
        />
      </StyledCheckboxLabelWrapper>
      {checked && note && (
        <NoteSection>
          <Typography variant='body2' color='var(--neutral-primary)' fontWeight={700}>
            <strong>Note: </strong>
            <span className='note-text'>{note}</span>
          </Typography>
        </NoteSection>
      )}
    </>
  );
};

export default CheckboxBody;
