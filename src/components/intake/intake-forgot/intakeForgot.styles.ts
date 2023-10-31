import { styled } from '@mui/system';

export const ForgotSuccessContainer = styled('div')({
  backgroundColor: 'var(--neutral-tertiary)',
  position: 'absolute',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const ForgotSuccessWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '588px',
  padding: '40px 24px 22px 24px ',
  '.success-container': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25vh',
    '.success-wrapper': {
      maxWidth: '384px',
      '.img-container': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
  '.header': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '8px',
    paddingTop: '24px',
    maxWidth: '384px',
  },
  '.title': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '40px',
    maxWidth: '384px',
  },
  '@media (min-width:880px)': {
    '.success-container': {
      marginTop: '33vh',
    },
  },
  '@media (max-width:501px)': {
    minWidth: '320px',
    paddingTop: '16px',
  },
});
