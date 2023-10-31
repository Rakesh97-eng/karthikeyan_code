import { styled } from '@mui/material';

export const DecencyAgreementContainer = styled('div')({
  backgroundColor: 'var(--honey-50) ',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  '.header-wrapper': {
    maxWidth: '588px',
    margin: '40px 24px 30px 24px ',
    '.section': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      div: {
        width: '48%',
      },
    },
    '.decency-image': {
      marginTop: '24px',
      maxWidth: '588px',
      width: '100%',
    },
    '.header-container': {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '588px',
      marginTop: '24px',
      flexDirection: 'column',
      '.header': {
        marginBottom: '32px',
        '@media (max-width:769px)': {
          marginBottom: '24px',
        },
        '@media (max-width:480px)': {
          marginBottom: '16px',
        },
      },
      '.title': {
        maxWidth: '588px',
        margin: 'auto',
        marginBottom: '24px',
      },
      '.agree-text': {
        marginTop: '-8px',
        marginBottom: '48px',
        '.link': {
          color: 'var(--accent-primary)',
          textDecorationColor: 'var(--accent-primary)',
        },
      },
    },
  },
});
