import React, { MouseEvent, ReactElement } from 'react';
import { StyledButtonWrapper } from './styles';
import { ButtonProps } from '@mui/material/Button';
import { Typography } from '@mui/material';

interface Props {
  variant: ButtonProps['variant'];
  fullWidth?: boolean;
  value: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isIcon?: boolean;
  icon?: ReactElement;
  className?: string;
  type?: ButtonProps['type'];
  fontWeight?:number;
}
const StyledButton: React.FC<Props> = ({
  variant,
  fullWidth = true,
  value,
  onClick,
  isDisabled = false,
  isIcon = false,
  icon,
  className,
  type = 'button',
  fontWeight=600
}) => {
  return (
    <StyledButtonWrapper
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={isDisabled}
      className={className}
      type={type}
    >
      {isIcon && icon}
      <Typography variant='btn' fontWeight={fontWeight}>{value}</Typography>
    </StyledButtonWrapper>
  );
};

export default StyledButton;
