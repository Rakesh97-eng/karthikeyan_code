import { FC } from 'react';
import { Typography } from '@mui/material';
import { StyledEmptyContainer } from './styles';

interface EmptyContainerProps {
  icon: JSX.Element;
  text: string;
  button: JSX.Element;
}

/**
 * EmptyContainer
 * Container to Show empty information grid
 */
export const EmptyContainer: FC<EmptyContainerProps> = ({
  icon,
  text,
  button,
}) => {
  return (
    <StyledEmptyContainer>
      {icon}
      <Typography variant='h3' color={'var(--neutral-primary)'}>
        {text}
      </Typography>
      {button}
    </StyledEmptyContainer>
  );
};
