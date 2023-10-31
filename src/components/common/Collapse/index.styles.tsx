import { styled } from '@mui/material';

export const CollapseWrapper = styled('div')({
  '.collapse-label': {
    paddingTop: '20px',
    paddingBottom: '4px',
  },
  '.step-content': {
    borderLeft: '4px solid var(--ocean-50)',
    borderRadius: '2px',
  },
  '.MuiStepLabel-iconContainer': {
    cursor: 'pointer',
    paddingRight: '12px',
  },
  '.txt-color':{
    color: 'var(--neutral-primary)',
  },
});
