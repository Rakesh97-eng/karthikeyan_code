import { styled } from '@mui/material';
export const ToastWrapper = styled('div')({
  '.MuiSnackbarContent-root': {
    flexWrap: 'nowrap',
  },
  '.success': {
    '.MuiSnackbarContent-root': {
      backgroundColor: 'var(--positive-primary-dark)',
    },
  },
  '.error': {
    '.MuiSnackbarContent-root': {
      backgroundColor: 'var(--negative-primary-dark)',
    },
  },
  '.secondary-success': {
    '.MuiSnackbarContent-root': {
      backgroundColor: 'var(--sky-50)',
    },
    '.secondary-notification-message': {
      color: 'var(--neutral-primary)',
      '.MuiLink-root': {
        textDecorationColor: 'var(--neutral-primary)',
        cursor: 'pointer',
      },
    },
  },
  '.MuiSnackbar-root': {
    minWidth: 'fit-content',
    boxShadow:
      '6px 8px 12px rgba(0, 0, 0, 0.04), 1px 1px 4px rgba(0, 0, 0, 0.08), 4px 6px 8px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
  },
  '.divider': {
    backgroundColor: 'var(--neutral-secondary)',
    height: '24px',
    margin: '0px 16px',
  },
  '.icon-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '8px',
  },
  '.left-icon': {
    display: 'flex',
    alignItems: 'center',
  },
  '.success-icon': {
    marginRight: '8px',
  },
});
