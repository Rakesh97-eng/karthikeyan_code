import { styled } from '@mui/system';

export const PastPurchaseContainer = styled('div')({
  '.card-wrapper': {
    padding: '0',
    marginBottom: '24px',
  },
});

export const ProductCardContainer = styled('div')({
  marginTop: '24px',
  '& .card-item': {
    padding: '0',
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  '.card-item:hover': {
    backgroundColor: 'var(--neutral-secondary-dark)',
  },
  '& .list-avatar': {
    borderRadius: '4px',
    height: '160px',
    width: '120px',
  },
  '.list-item-text': {
    margin: '0',
    marginLeft: '16px',
    marginTop: '-6px',
    '.prod-brand': {
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
  },
  '& .list-avatar-set': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    '.select-icon': {
      position: 'absolute',
      marginLeft: '8px',
      marginTop: '8px',
      cursor: 'pointer',
      color: 'var(--neutral-primary)',
      backgroundColor: 'var(--neutral-secondary)',
      height: '24px',
      '.MuiChip-label': {
        padding: '5px 8px',
      },
    },
    '.select-icon1': {
      position: 'absolute',
      cursor: 'pointer',
      marginLeft: '8px',
      marginTop: '120px',
      color: 'var(--neutral-primary)',
      backgroundColor: 'var(--neutral-secondary)',
      height: '24px',
      '.MuiChip-label': {
        padding: '4px 5px',
      },
    },
  },
  '.skeleton-list-item-text': {
    height: '160px',
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
});

export const ContentFooterWrapper = styled('div')({
  '.chip-style': {
    padding: '5px 8px 3px',
    textTransform: 'uppercase',
  },
  '.MuiChip-label': {
    padding: '0px',
    color: 'var(--neutral-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
});

export const IconDateWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  '.card-icon': {
    marginRight: '8px',
  },
});
