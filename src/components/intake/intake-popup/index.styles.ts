import { styled } from '@mui/system';

export const PopUpWrapper = styled('div')({});
export const PopUpHeader = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});
export const PopUpContent = styled('div')({
  padding: '24px',
  paddingBottom: '16px',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width:400px)': {
    padding: '0px',
    paddingBottom: '16px',
  },
  '.title': {
    marginBottom: '24px',
    textAlign: 'center',
    '@media (max-width:768px)': {
      marginBottom: '16px',
    },
  },
  '.content': {
    marginBottom: '32px',
    textAlign: 'center',
  },
  '.bottom-btn': {
    textAlign: 'center',
    color: 'var(--accent-primary)',
    fontWeight: '600',
    cursor: 'pointer',
  },
});
export const PopUpContentWrapper = styled('div')({
  padding: '24px',
  paddingBottom: '0px',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width:400px)': {
    padding: '0px',
    paddingBottom: '0px',
  },

  '.title': {
    marginBottom: '24px',
    textAlign: 'center',
    '@media (max-width:768px)': {
      marginBottom: '16px',
    },
  },
  '.content': {
    marginBottom: '32px',
    textAlign: 'center',
  },
  '.MuiButton-root': {
    margin: '0',
  },
});
