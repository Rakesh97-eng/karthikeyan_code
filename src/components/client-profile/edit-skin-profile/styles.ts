import { AppBar, Box, Button, Grid, styled, Typography } from '@mui/material';

export const SPEditHeader = styled(AppBar)({
  backgroundColor: 'var(--neutral-secondary)',
  boxShadow: 'none',
  color: 'var(--neutral-primary)',
  ['& .dismiss-icon']: {
    marginRight: '0',
  },
});

export const SPHeaderTitle = styled(Typography)({
  margin: '0 auto',
});

export const InnerWrapper = styled('div')({
  padding: '16px 16px 0',
});

export const EditButtonsWrapper = styled(Grid)({
  position: 'sticky',
  backgroundColor: 'var(--neutral-secondary)',
  bottom: '0',
  padding: '0 16px',
  zIndex: '2',
});

export const SkinProfilePopupWrapper = styled(Box)({
  '.content': {
    color: 'var(--neutral-primary-light)',
    marginTop: '8px',
  },
  '.buttons-wrapper': {
    marginTop: '40px',
  },
});

export const CancelChangesBtn = styled(Button)({
  backgroundColor: 'var(--negative-primary-dark)',
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
