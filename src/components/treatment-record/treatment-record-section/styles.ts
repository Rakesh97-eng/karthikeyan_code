import { styled, Box } from '@mui/material';

export const TRSectionWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '16px',
  padding: '24px',
  marginTop: '34px',
  '& .tr-section-titles-wrapper': {
    marginBottom: '12px',
    '& .tr-section-title-icon-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .tr-section-title': {
      color: 'var(--neutral-primary)',
    },
    '& .tr-section-info': {
      color: 'var(--neutral-primary-light)',
      marginTop: '8px',
    },
  },
  '.questions-wrapper': {
    marginBottom: '24px',
    '&:last-child': {
      marginBottom: 0,
    },
    '.MuiTypography-root': {
      display: 'flex',
    },
  },
});

export const TRSectionHeaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--neutral-primary)',
  '& .tr-section-icon': {
    padding: '4px 8px 4px 0px',
  },
  '.custom-switch': {
    marginLeft: 'auto',
  },
});

export const ElementSection = styled(Box)({
  marginBottom: '24px',
  ':first-child': {
    marginTop: '24px',
  },
});
