import { LinearProgress, styled } from '@mui/material';

export const StyledProgressBar = styled(LinearProgress)({
  backgroundColor: 'transparent',
  height: '8px',
  '.MuiLinearProgress-bar': {
    backgroundColor: 'var(--terracota-100)',
    borderRadius: '0px 12px 12px 0px',
  },
});
