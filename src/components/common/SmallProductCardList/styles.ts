import { styled } from '@mui/system';

export const ProductCard = styled('div')({
  marginTop: '16px',
  '& .card-item': {
    padding: '0',
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  '& .list-avatar': {
    borderRadius: '4px',
    height: '72px',
    width: '54px',
  },
  '.list-item-text': {
    margin: '0',
    marginLeft: '16px',
    marginTop: '-8px',
    '.prod-brand': {
      textTransform: 'uppercase',
      marginBottom: '8px',
      letterSpacing: '0.03em',
    },
  },
});
export const MediumProductCardWrapper = styled('div')({
  border: '1px solid var(--neutral-secondary-darker)',
  padding: '8px',
  margin: '8px 0px',
  borderRadius: '8px',
  '& .card-item': {
    padding: '0',
    display: 'flex',
    alignItems: 'flex-start',
  },
  '& .list-avatar': {
    borderRadius: '4px',
    height: '72px',
    width: '54px',
  },
  '.list-item-text': {
    margin: '0',
    marginLeft: '16px',
    marginTop: '-8px',
    '.prod-brand': {
      textTransform: 'uppercase',
      marginBottom: '8px',
      letterSpacing: '0.06em',
    },
  },
  '.skeleton-list-item-text': {
    height: '72px',
    marginLeft: '16px',
    width: '100%',
    borderRadius: '4px',
  },
  '.MuiSkeleton-root': {
    backgroundColor: 'var(--neutral-primary-lighter)',
  },
});
export const ContentHeaderWrapper = styled('div')({
  color: 'var(--neutral-primary)',
  '.prod-name': {
    marginBottom: '8px',
  },
  '.chip-style': {
    marginRight: '8px',
    marginBottom: '8px',
    height: 'auto',
    backgroundColor: 'var(--peony-50)',
    padding: '5px 8px 3px',
    '.MuiChip-label': {
      padding: '0',
      lineHeight: '12px',
      textTransform: 'uppercase',
    },
  },
});
