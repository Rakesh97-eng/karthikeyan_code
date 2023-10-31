import { styled } from '@mui/system';
import { Accordion } from '@mui/material';

export const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  border: 'none',
  '&.accordion-wrapper:before': {
    backgroundColor: 'var(--neutral-secondary-dark) !important',
  },

  '&.Mui-expanded': {
    marginTop: '0',
    '&:before': {
      opacity: '1',
    },
  },

  '.accordion-summary-root': {
    padding: '0',
    alignItems: 'baseline',
    minHeight: 'auto',

    '&.accordion-expanded': {
      minHeight: 'auto',
    },

    '&:hover': {
      cursor: 'pointer',
    },

    '&:active': {
      backgroundColor: 'var(--neutral-secondary-dark)',
    },

    '& .accordion-title': {
      color: 'var(--neutral-primary)',
      fontWeight: '600',
      '&.accordion-title-expanded': {
        fontWeight: '700',
      },
    },
  },

  '.accordion-summary-content': {
    margin: '16px 0',
    '&.accordion-expanded': {
      margin: 0,
      marginBottom: '8px',
    },
  },

  '.accordion-details': {
    padding: '0',
  },
});
