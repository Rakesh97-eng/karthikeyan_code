import { Box, styled } from '@mui/material';

interface RadioBtnProps {
  isother: boolean;
}

export const StyledRadioWrapper = styled(Box)({
  width: '100%',
  position: 'relative',
  marginTop: '8px',
});

export const StyledRadioButton = styled('input')((props: RadioBtnProps) => ({
  WebkitAppearance: 'none',
  appearance: 'none',
  left: '12px',
  width: '24px',
  height: '24px',
  position: 'absolute',
  top: '14px',
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
    backgroundColor: props.isother
      ? 'var(--neutral-secondary-dark)'
      : 'var(--sky-50)',
    border: '1px solid var(--sky-50)',
  },
  ':checked:active + label': {
    backgroundColor: props.isother
      ? 'var(--neutral-secondary-darker)'
      : 'var(--sky-75)',
    border: '1px solid var(--sky-75)',
  },
}));

export const StyledLabel = styled('label')({
  padding: '12px',
  paddingLeft: '12px',
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  width: '100%',
  cursor: 'pointer',
  border: '1px solid var(--neutral-secondary-darker)',
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  color: 'var(--ocean-100)',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  transition: 'background-color 200ms linear',
  ':hover': {
    cursor: 'pointer',
  },
  '.label-title': {
    marginLeft: '32px',
  },
});

export const NotesWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    borderTop: 'none',
    marginTop: '0',
  },
  '.custom-textarea': {
    backgroundColor: 'var(--neutral-secondary)',
  },
});
