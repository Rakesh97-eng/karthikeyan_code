import { styled, Button } from '@mui/material';
import { Box } from '@mui/system';

export const DeleteTreatmentDialogWrapper = styled(Box)({
  '.content': {
    color: 'var(--neutral-primary-light)',
    marginTop: '8px',
  },
  '.buttons-wrapper': {
    marginTop: '40px',
  },
});

export const DeleteTreatmentBtn = styled(Button)({
  backgroundColor: 'var(--negative-primary-dark)',
  color: 'var(--neutral-secondary)',
  borderRadius: '8px',
  textTransform: 'none',
  marginBottom: '8px',
  boxShadow: 'none',
  padding: '18px 0',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--negative-primary-dark)',
    boxShadow: 'none',
  },
});

export const KeepEditingBtn = styled(Button)({
  backgroundColor: 'var(--neutral-secondary)',
  border: '2px solid var(--accent-primary)',
  borderRadius: '8px',
  color: 'var(--accent-primary)',
  textTransform: 'none',
  boxShadow: 'none',
  padding: '18px 0',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--neutral-secondary)',
    boxShadow: 'none',
  },
});
