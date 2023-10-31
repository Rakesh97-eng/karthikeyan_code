import { styled } from '@mui/system';

export const ChipWrapper = styled('div')({
  '.chip-style': {
    marginRight: '8px',
    marginBottom: '8px',
    height: 'auto',
    backgroundColor: 'var(--peony-50)',
    padding: '5px 8px',
    '.MuiChip-label': {
      padding: '0',
      lineHeight: '12px',
      textTransform: 'uppercase',
      color: 'var(--neutral-primary)',
      letterSpacing: '0.08em',
    },
  },
  '.gray-chip': {
    backgroundColor: 'var(--neutral-secondary-dark)',
    '.MuiChip-label': {
      textTransform: 'uppercase',
      color: 'var(--dark-black)',
      letterSpacing: '0.08em',
    },
  },
});

export const ChipWrapperList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
});
