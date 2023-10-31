import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';

export const SkinProfileDetailWrapper = styled(Box)({
  marginTop: '16px',
  '&:first-child': {
    marginTop: '0',
  },
  '.question-title': {
    color: 'var(--neutral-primary-light)',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  '.question-response': {
    color: 'var(--neutral-primary)',
    marginBottom: '8px',
  },
  '.attribute-pill-wrapper .attribute-pill': {
    paddingLeft: '0',
    paddingRight: '0',
    marginBottom: '16px',
    display: 'flex',
    gap:'12px',
    '.MuiTypography-root': {
      color: 'var(--neutral-primary)',
    },
  },
});

export const SPEditDialog = styled(Dialog)({
  '&.sp-edit-dialog': {
    height: '100%',
  },
  '&.sp-edit-dialog .MuiDialog-paper': {
    backgroundColor: 'var(--neutral-secondary-dark)',
    height: '100%',
  },
});
