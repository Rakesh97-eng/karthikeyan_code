import { Box, styled } from '@mui/material';

export const StyledRadioWrapper = styled(Box)({
  width: '100%',
  position: 'relative',
  marginTop: '8px',
});

export const StyledRadioButton = styled('input')(() => ({
  WebkitAppearance: 'none',
  appearance: 'none',
  right: '20px',
  width: '24px',
  height: '24px',
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  outline: 'none',
  border: '1px solid var(--neutral-secondary-darker)',
  borderRadius: '12px',
  zIndex: '1',
  ':hover': {
    cursor: 'pointer',
  },
  ':checked': {
    backgroundColor: 'var(--accent-primary)',
    border: '4px solid var(--neutral-secondary)',
  },
  ':active + label': {
    backgroundColor: 'var(--neutral-secondary-dark)',
    border: '1px solid var(--neutral-secondary-darker)',
  },
  ':checked + label': {
    backgroundColor: 'var(--sky-50)',
    border: '1px solid var(--sky-50)',
  },
  ':checked:active + label': {
    backgroundColor: 'var(--sky-75)',
    border: '1px solid var(--sky-75)',
  },
}));

export const StyledLabel = styled('label')({
  padding: '20px',
  display: 'inline-block',
  width: '100%',
  cursor: 'pointer',
  border: '1px solid var(--neutral-secondary-darker)',
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  color: 'var(--neutral-primary)',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  transition: 'background-color 200ms linear',
  ':hover': {
    cursor: 'pointer',
  },
});

export const NotesWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--neutral-secondary)',
  marginTop: '6px',
  marginBottom: '8px',
  borderRadius: '8px',

  '& > div': {
    borderTop: 'none',
    marginTop: '0',
  },
  '.custom-textarea': {
    backgroundColor: 'var(--neutral-secondary)',
    borderRadius: '8px',
    padding: '0px 12px',
  },
  '.custom-textarea:focus': {
    borderRadius: '8px',
  },
});
