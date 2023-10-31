import { styled } from '@mui/material';

export const KnackRecordWrapper = styled('div')({
  background: 'var(--neutral-secondary)',
  margin: '16px',
  minWidth: '480px',
});
export const KnackRecordRow = styled('div')({
  display: 'flex',
  borderBottom: '1px solid var(--neutral-secondary-dark)',
});
export const KnackRecordColumn = styled('div')({
  minWidth: '218px',
  padding: '24px 16px',
  '&:first-child': {
    borderRight: '1px solid var(--neutral-secondary-dark)',
  },
});
