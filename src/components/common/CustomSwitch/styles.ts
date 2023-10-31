import styled from '@emotion/styled';
import { Switch } from '@mui/material';

export const StyledSwitch = styled(Switch)({
  width: '52px',
  height: '32px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: 'var(--neutral-secondary)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--sky-100)',
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
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: '28px',
    height: '28px',
    boxShadow: '0px 3px 7px 0px var(--dark-black-with-opacity)',
  },
  '& .MuiSwitch-track': {
    borderRadius: '16px',
    backgroundColor: 'var(--neutral-secondary-darker)',
    opacity: 1,
  },
});
