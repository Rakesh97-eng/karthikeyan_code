import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import Checkbox from '../../../../assets/icons/checkbox-white-tick.svg';

export const StyledCheckboxLabelWrapper = styled('div')({
  position: 'relative',
});
export const StyledCheckboxLabel = styled('label')({
  color: 'var(--neutral-primary)',
  padding: '8px 0px 8px 34px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  transition: 'background-color 200ms linear',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  ':active': {
    backgroundColor: 'var(--neutral-secondary-darker)',
  },
});
export const StyledCheckboxInput = styled('input')({
  WebkitAppearance: 'none',
  appearance: 'none',
  WebkitTransition: 'background-color 200ms linear',
  MozTransition: 'background-color 200ms linear',
  OTransition: 'background-color 200ms linear',
  transition: 'background-color 200ms linear',
  font: 'inherit',
  width: '24px',
  height: '24px',
  border: '1.5px solid var(--neutral-secondary-darker)',
  borderRadius: '4px',
  transform: 'translateY(-0.075em)',
  position: 'absolute',
  left: '1rem',
  top: 0,
  bottom: 0,
  margin: 'auto',
  marginLeft: '-16px',
  outline: 'none',
  ':checked': {
    backgroundImage: `url(${Checkbox})`,
    backgroundColor: 'var(--accent-primary)',
    backgroundSize: '80%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    WebkitTransition: 'background-image 200ms linear',
    MozTransition: 'background-image 200ms linear',
    OTransition: 'background-image 200ms linear',
    transition: 'background-image 200ms linear',
  },
  '::before': {
    content: '""',
    width: '24px',
    height: '24px',
  },
});

export const FilterWrapper = styled('div')({
  '.MuiTabs-root': {
    backgroundColor: 'var(--neutral-secondary-dark)',
    padding: '2px',
    borderRadius: '8px',
    margin: '16px 0px',
    minHeight: '30px',
    span: {
      color: 'var(--neutral-primary-light)',
    },
    '.MuiTabs-indicator': {
      backgroundColor: 'transparent',
    },
  },
  '.MuiTab-root': {
    textTransform: 'none',
    width: '50%',
    height: '100%',
    padding: '0',
  },
  '.Mui-selected ': {
    backgroundColor: 'var(--neutral-secondary)',
    boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.12)',
    borderRadius: '6px',
    padding: '6px',
    span: {
      color: 'var(--neutral-primary)',
    },
  },
  '.switch-part': {
    display: 'flex',
    padding: '16px 0px',
    justifyContent: 'space-between',
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: 'var(--neutral-secondary)',
        '& + .MuiSwitch-track': {
          backgroundColor: 'var(--accent-primary)',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: 'var(--neutral-secondary)',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
  },
  '.title': {
    padding: '8px 0px',
    fontWeight: '700',
    color: 'var(--dark-black)',
  },
  '.divider': {
    margin: '8px 0px',
  },
});
export const StyledSwitch = styled(Switch)({
  position: 'relative',
  marginTop: '8px',
});
