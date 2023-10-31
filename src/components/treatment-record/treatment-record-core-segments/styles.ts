import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const CoreSegmentWrapper = styled(Box)({
  marginTop: '32px',
  '.core-segment-title': {
    color: 'var(--neutral-primary)',
    display: 'flex',
    alignItems: 'baseline',
  },
  '.core-segment-info': {
    color: 'var(--neutral-primary-light)',
    marginTop: '8px',
  },
});

export const CoreSegmentInnerWrapper = styled(Box)({
  padding: '0 24px',
});

export const CustomerNoteWrapper = styled(Box)({
  display: 'flex',
  columnGap: '12px',
  marginTop: '16px',
  flexWrap: 'wrap',
  rowGap: '20px',
});

export const CustomerNote = styled(Box)({
  backgroundColor: 'var(--honey-50)',
  borderRadius: '20px',
  padding: '8px 12px',
  color: 'var(--neutral-primary)',
  display: 'flex',
  alignItems: 'center',
  '& .customer-note-icon': {
    margin: '6px',
  },
});
