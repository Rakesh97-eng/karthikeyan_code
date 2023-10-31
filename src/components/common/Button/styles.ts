import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

export const StyledButtonWrapper = styled(Button)(
  ({ variant }: ButtonProps) => ({
    backgroundColor:
      variant === 'outlined'
        ? 'var(--neutral-secondary)'
        : 'var(--accent-primary)',
    borderRadius: '6px',
    padding: '16px 32px',
    textTransform: 'none',
    boxShadow: 'none',
    height: '56px',
    marginBottom: '16px',
    border: '1.5px solid var(--accent-primary) ',
    color:
      variant === 'outlined'
        ? 'var(--accent-primary)'
        : 'var(--neutral-secondary)',
    '&:active': {
      backgroundColor: 'var(--neutral-secondary) ',
    },
    '&:disabled': {
      backgroundColor: 'var(--neutral-secondary-darker) ',
      color: 'var(--neutral-secondary) ',
      border: 'none',
    },
    '&:hover': {
      border: '1.5px solid var(--accent-primary) ',
      backgroundColor:
        variant === 'outlined'
          ? 'var(--neutral-secondary)'
          : 'var(--accent-primary)',
      boxShadow: 'none',
    },
  })
);
