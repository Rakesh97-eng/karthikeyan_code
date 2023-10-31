import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const PastTreatmentFSVContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--neutral-secondary)',
  padding: '24px 16px',
  marginTop: '24px',
  maxWidth: '792px',
  borderRadius: '8px',
  '.pastTreatmentGrid': {
    gap: '24px',
    display: 'grid',
  },
  '@media (max-width:880px)': {
    padding: '16px 16px',
  },
}));

export const PastTreatmentFSVHeader = styled(Box)(() => ({
  display: 'flex',
  '.headerIcon': {
    marginRight: '16px',
  },
}));
export const RecordsWrapper = styled(Box)(() => ({
  display: 'grid',
  gap: '24px',
  marginBottom: '24px',
}));
