import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface IClientPreference {
  selected: boolean;
}

export const ClientPreferencesWrapper = styled(Box)({
  '.accordion-wrapper': {
    boxShadow: 'none',
    border: 'none',
    '&:before': {
      backgroundColor: 'var(--neutral-secondary-dark) !important',
    },
    '&.Mui-expanded': {
      marginTop: '0',
      '&:before': {
        opacity: '1',
      },
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
    '& .cp-cat-title': {
      color: 'var(--neutral-primary)',
      fontWeight: '600',
      '&.cp-cat-title-expanded': {
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

export const StyledClientPreference = styled(Box)(
  (props: IClientPreference) => ({
    display: 'flex',
    margin: '4px 0',
    padding: '8px 0',
    '.pref-icon': {
      marginRight: '15px',
      '& path': {
        stroke: props.selected
          ? 'var(--neutral-primary-light)'
          : 'var(--neutral-primary)',
      },
    },
    '.pref-action-icon': {
      marginLeft: 'auto',
      padding: '0',
      '& path': {
        fill: props.selected
          ? 'var(--neutral-primary-light)'
          : 'var(--neutral-primary)',
      },
    },
    '.cp-label': {
      color: props.selected
        ? 'var(--neutral-primary-light)'
        : 'var(--neutral-primary)',
    },
  })
);

export const SelectedPreferencesWrapper = styled(Box)({
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  marginTop: '16px',
  '.cp-add-button': {
    borderRadius: '20px',
    padding: '8px 12px',
    height: 'auto',
    border: '1px solid var(--neutral-secondary-darker)',
    color: 'var(--neutral-primary)',
    '.add-icon': {
      marginRight: '8px',
    },
  },
  '.cp-circle-add-button': {
    padding: '0',
    '& svg': {
      width: '40px',
      height: '40px',
    },
  },
});
