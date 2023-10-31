import { Box, Button, styled } from '@mui/material';

export const AppointmentsDialogWrapper = styled(Box)({
  '.header': {
    textAlign: 'center',
  },
  '.content': {
    marginTop: '8px',
    textAlign: 'center',
  },
  '.buttons-wrapper': {
    marginTop: '40px',
  },
  '.appointments-radio-label': {
    color: 'var(--neutral-primary)',
    fontWeight: '400',
  },
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  cursor: 'pointer',
  '.css-yvetkp-MuiButtonBase-root-MuiIconButton-root': {
    padding: 0,
  },
});

export const PrimaryButton = styled(Button)({
  backgroundColor: 'var(--accent-primary)',
  borderRadius: '8px',
  textTransform: 'none',
  marginBottom: '8px',
  boxShadow: 'none',
  padding: '16px 0',
  width: '100%',
  marginTop: '24px',
  fontWeight: '700',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'var(--accent-primary)',
    boxShadow: 'none',
  },
  ':disabled': {
    backgroundColor: 'var(--neutral-secondary-darker)',
    color: 'var(--neutral-secondary)',
  },
});
