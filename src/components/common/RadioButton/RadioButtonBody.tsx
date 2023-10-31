import { Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { StyledRadioButton, StyledRadioWrapper, StyledLabel } from './styles';

interface IRadioButtonBody {
  id: string;
  name: string;
  value: string;
  label: string;
  onClick?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  mandatory: boolean;
  labelClassName?: string;
  fontWeight?: number;
}

const RadioButtonBody: FC<IRadioButtonBody> = ({
  id,
  name,
  value,
  label,
  onClick,
  onChange,
  checked,
  mandatory,
  labelClassName,
  fontWeight = 600,
  ...restProps
}) => {
  return (
    <StyledRadioWrapper>
      <StyledRadioButton
        {...restProps}
        id={`${id}-${value}`}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        required={mandatory}
        type='radio'
      />
      <StyledLabel htmlFor={`${id}-${value}`} className={labelClassName}>
        <Typography variant='btn' fontWeight={fontWeight}>
          {label}
        </Typography>
      </StyledLabel>
    </StyledRadioWrapper>
  );
};

export default RadioButtonBody;
