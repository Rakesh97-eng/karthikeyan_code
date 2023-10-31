import { styled, Container, CircularProgress, Box } from '@mui/material';

export const MainWrapper = styled(Box)({
  backgroundColor: 'var(--neutral-tertiary)',
});

export const StyledContainer = styled(Container)({
  '&.main-container': {
    padding: '16px 0',
  },
});

export const ContentWrapper = styled('div')({
  padding: '0 16px',
});

export const StyledCircularProgress = styled(CircularProgress)({
  display: 'block',
  margin: '0 auto',
  color: 'var(--accent-primary)',
});

export const StyledMainBlock = styled('main')({
  backgroundColor: 'var(--neutral-tertiary)',
  minHeight: '100vh',
});
