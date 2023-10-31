import { styled } from '@mui/system';

export const TreatmentBtnWrapper = styled('div')({
  position: 'sticky',
  display: 'flex',
  justifyContent: 'flex-end',
  bottom: '16px',
  zIndex: '1000',
});
export const ClientDetailsContainer = styled('div')({
  '.skin-profile': {
    '@media (min-width:767px)': {
      position: 'sticky',
      top: '10px',
    },
  },
  '.gridButton:hover': {
    background: 'var(--neutral-secondary)',
  },
});
