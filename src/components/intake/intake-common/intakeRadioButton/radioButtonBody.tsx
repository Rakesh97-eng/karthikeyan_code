import { Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { StyledRadioButton, StyledRadioWrapper, StyledLabel } from './styles';

interface IRadioButtonBody {
  id?: string;
  name?: string;
  value?: string;
  label: string;
  subLabel?: string;
  onClick?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  mandatory: boolean;
  labelClassName?: string;
}

const RadioButtonBody: FC<IRadioButtonBody> = ({
  id,
  name,
  value,
  label,
  subLabel,
  onClick,
  onChange,
  checked,
  mandatory,
  labelClassName,
  ...restProps
}) => {
  return (
    <StyledRadioWrapper>
      <StyledLabel htmlFor={`${id}-${value}`} className={labelClassName}>
        <Typography variant='btn' fontWeight='700'>
          {label}
        </Typography>
        {subLabel && (
          <Typography variant='body2' className={'label-txt'} color={'var(--neutral-primary-light)'}>
            {subLabel}
          </Typography>
        )}
      </StyledLabel>
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
    </StyledRadioWrapper>
  );
};

export default RadioButtonBody;
