import { StyledIconButton } from './intake.styles';
import { ReactComponent as BackIcon } from '../../assets/icons/chevron-left.svg';
import { Typography } from '@mui/material';
import { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
}

const StyledBackButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledIconButton startIcon={<BackIcon />}>
      <Typography
        variant='btn'
        color='var(--neutral-primary)'
        onClick={onClick}
      >
        Back
      </Typography>
    </StyledIconButton>
  );
};

export default StyledBackButton;
