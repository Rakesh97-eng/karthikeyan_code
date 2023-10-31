import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Checkbox from '../../../assets/icons/checkbox-tick.svg';
interface CheckboxProps {
  checked: boolean;
  isother: boolean;
}
export const StyledCheckboxLabelWrapper = styled('div')({
  position: 'relative',
  marginTop: '8px',
});
export const StyledCheckboxLabel = styled('label')((props: CheckboxProps) => ({
  color: 'var(--ocean-100)',
  padding: '10.75px 14px',
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  width: '100%',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid var(--neutral-secondary-darker)',
  backgroundColor: props.checked
    ? props.isother
      ? 'var(--neutral-secondary-dark)'
      : 'var(--sky-50)'
    : 'var(--neutral-secondary)',
  borderRadius: '8px',
  transition: 'background-color 200ms linear',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  ':active': {
    backgroundColor: 'var(--neutral-secondary-darker)',
  },
  '.label-title': {
    marginLeft: '32px',
  },
}));
export const StyledCheckboxInput = styled('input')((props: CheckboxProps) => ({
  WebkitAppearance: 'none',
  appearance: 'none',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  transition: 'background-color 200ms linear',
  font: 'inherit',
  width: '24px',
  height: '24px',
  border: !props.checked
    ? `1.5px solid var(--neutral-secondary-darker)`
    : 'none',
  borderRadius: '4px',
  transform: 'translateY(-0.075em)',
  position: 'absolute',
  left: '1rem',
  top: '14px',
  margin: 'auto',
  outline: 'none',
  cursor: 'pointer',
  ':checked': {
    backgroundImage: `url(${Checkbox})`,
    backgroundSize: '80%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    WebkitTransition: 'background-image 200ms linear',
    MozTransition: 'background-image 200ms linear',
    OTransition: 'background-image 200ms linear',
    transition: 'background-image 200ms linear',
    '& + label': {
      backgroundColor: props.isother
        ? 'var(--neutral-secondary-dark)'
        : 'var(--sky-50)',
    },
    '&:active + label': {
      backgroundColor: 'var(--sky-75)',
    },
  },

  '::before': {
    content: '""',
    width: '24px',
    height: '24px',
  },
}));

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
    borderRadius: '8px',
  },
  '.custom-textarea:focus': {
    borderRadius: '8px',
  },
});
