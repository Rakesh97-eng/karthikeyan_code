import { styled } from '@mui/material/styles';
import Checkbox from '../../../assets/icons/checkbox-tick.svg';
interface CheckboxProps {
  checked: boolean;
}
export const StyledCheckboxLabelWrapper = styled('div')({
  position: 'relative',
  marginTop: '8px',
});
export const StyledCheckboxLabel = styled('label')((props: CheckboxProps) => ({
  color: 'var(--ocean-100)',
  padding: '10.75px 48px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid var(--neutral-secondary-darker)',
  backgroundColor: props.checked ? 'var(--sky-50)' : 'var(--neutral-secondary)',
  borderRadius: '8px',
  transition: 'background-color 200ms linear',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  ':active': {
    backgroundColor: 'var(--neutral-secondary-darker)',
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
  top: 0,
  bottom: 0,
  margin: 'auto',
  outline: 'none',
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
      backgroundColor: 'var(--sky-50)',
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
export const StyledNestedElementWrapper = styled('div')(
  (props: { show?: boolean }) => ({
    display: props?.show ? 'block' : 'none',
    paddingLeft: '16px',
    marginLeft: '5px',
    borderLeft: '3px solid var(--ocean-50)',
    marginTop: '16px',
    transition: 'height 0.25s ease-in',
    marginBottom: '24px',
    color: 'var(--neutral-primary)',
  })
);
