import { Box, styled } from '@mui/material';

export const ItalicText = styled('span')(() => ({
  color: 'var(--neutral-primary-light)',
  fontStyle: 'italic',
}));
export const LabelsWrapper = styled(Box)(() => ({
  marginBottom: '16px',
}));
