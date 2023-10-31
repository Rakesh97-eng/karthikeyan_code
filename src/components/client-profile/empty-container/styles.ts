import { styled } from '@mui/material';

export const StyledEmptyContainer = styled('div')({
  border: '2px dashed var(--neutral-tertiary-dark)',
  boxSizing: 'border-box',
  borderRadius: '8px',
  minHeight: '240px',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  '& .MuiButton-root': {
    backgroundColor: 'var(--neutral-secondary)',
    borderRadius: '8px',
    padding: '12px 16px 12px 16px',
    color: 'var(--accent-primary)',
    fontWeight: '700',
    fontFamily: 'Cadiz',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textTransform: 'capitalize',
  },
  '& .MuiTypography-h3': {
    color: 'var(--neutral-primary)',
  },
  '& button span svg path': {
    stroke: 'var(--accent-primary)',
  },
});
