import { styled, AppBar, Typography, Dialog, Menu } from '@mui/material';

export const TreatmentRecordHeaderAppBar = styled(AppBar)({
  backgroundColor: 'var(--neutral-secondary)',
  boxShadow: 'none',
  color: 'var(--neutral-primary)',
  ['& .dismiss-icon']: {
    marginRight: '0',
  },
});

export const HeaderTitle = styled(Typography)({
  margin: '0 auto',
});

export const DeleteDialog = styled(Dialog)({
  '.MuiDialog-paper': {
    maxWidth: '360px',
    borderRadius: '8px',
    padding: '24px',
  },
  '@media (max-width:501px)': {
    margin: '0 20px',
  },
});

export const DeleteTreamentMenu = styled(Menu)({
  '.MuiPaper-root': {
    marginTop: '14px',
    borderRadius: '8px',
  },
  '.single-btn': {
    display: 'block',
  },
  '& .MuiMenu-list': {
    borderRadius: '8px',
    padding: '0',
    ['& .MuiButtonBase-root']: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '8px 16px',
      ['& .delete-icon']: {
        marginRight: '16px',
      },
    },
  },
});
