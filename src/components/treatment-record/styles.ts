import { styled, Dialog, Button, Snackbar } from '@mui/material';

export const TRButton = styled(Button)({
  backgroundColor: 'var(--accent-primary)',
  borderRadius: '40px',
  color: 'var(--neutral-secondary)',
  textTransform: 'none',
  padding: '16px',
  zIndex: '1000',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--accent-primary)',
  },
  '&:active': {
    backgroundColor: 'var(--accent-primary-dark)',
  },
});

export const TreatmentRecordDialog = styled(Dialog)({
  '&.treatment-record-dialog': {
    height: '100%',
  },
  '&.treatment-record-dialog .MuiDialog-paper': {
    backgroundColor: 'var(--neutral-secondary-dark)',
    height: '100%',
  },
});

export const InnerWrapper = styled('div')({
  padding: '16px 16px 0',
});
export const SnackbarWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  background: 'var(--neutral-primary)',
  borderRadius: '8px',
  padding: '10px 8px',
  img: {
    marginRight: '5px',
  },
});
export const StyledSnackbar = styled(Snackbar)({
  bottom: '54px',
});
export const ETRButton = styled(Button)({
  backgroundColor: 'var(--honey-75)',
  borderRadius: '40px',
  color: 'var(--slate-100)',
  textTransform: 'none',
  padding: '16px',
  zIndex: '1000',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--honey-75)',
  },
  '&:active': {
    backgroundColor: 'var(--honey-100)',
  },
});
export const EditIcon = styled('span')({
  padding: '0px 10px 0px 0px',
});
