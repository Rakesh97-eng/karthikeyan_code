import { styled } from '@mui/material';

export const SPSectionWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '16px',
  padding: '24px',
  marginTop: '34px',
  '&:first-child': {
    marginTop: '0',
  },
  '& .sp-section-titles-wrapper': {
    marginBottom: '12px',
    '& .sp-section-title-icon-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .sp-section-title': {
      color: 'var(--neutral-primary)',
    },
    '& .sp-section-info': {
      color: 'var(--neutral-primary-light)',
      marginTop: '8px',
    },
  },
  '.questions-wrapper': {
    marginTop: '24px',
    textTransform: 'capitalize',
    '.MuiTypography-root': {
      display: 'flex',
    },
    '.custom-styled': {
      borderRadius: '8px',
      border: '1px solid var(--neutral-secondary-darker)',
      padding: '10px 20px',
    },
    '.check-box-wrapper': {
      marginLeft: '2px',
      marginTop: '8px',
      lineHeight: '24px',
      '.check-box': {
        padding: 0,
        marginRight: '8px',
      },
    },
  },
});

export const SPSectionHeaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--neutral-primary)',
  '& .sp-section-icon': {
    padding: '4px 8px 4px 0px',
  },
});
