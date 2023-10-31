import React, { ChangeEvent } from 'react';
import { Typography } from '@mui/material';
import {
  StyledCheckboxLabelWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
} from './styles';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  isDisabled?: boolean;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  fontWeight: number;
}
const CheckboxBody: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  isDisabled,
  checked,
  onChange,
  fontWeight = 700,
}) => {
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
      />
      <StyledCheckboxLabel htmlFor={id} checked={checked}>
        <Typography variant='btn' fontWeight={fontWeight}>
          {label}
        </Typography>
      </StyledCheckboxLabel>
    </StyledCheckboxLabelWrapper>
  );
};

export default CheckboxBody;
