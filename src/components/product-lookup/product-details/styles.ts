import styled from '@emotion/styled';

export const ProductImageContainer = styled('div')({
  '.prod-image': {
    width: '100%',
    maxHeight: '485px',
    objectFit: 'cover',
    borderBottomLeftRadius: '500px 43px',
    borderBottomRightRadius: '300px 43px',
    '@media (maxWidth:787px)': {
      borderBottomLeftRadius: '400px 43px',
      borderBottomRightRadius: '250px 43px',
    },
    '@media (maxWidth:480px)': {
      borderBottomLeftRadius: '300px 43px',
      borderBottomRightRadius: '150px 43px',
    },
  },
  '.MuiChip-root': {
    backgroundColor: 'var(--neutral-secondary)',
    '.MuiChip-label': {
      padding: '4px 8px 2px',
      gap: '10px',
      '.product-type': {
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--neutral-primary)',
      },
    },
  },
  '.close-icon': {
    position: 'absolute',
    right: '16px',
    top: '16px',
  },
  '.image-wrapper': {},
  '.chip': {
    display: 'flex',
    gap: '8px',
    position: 'relative',
    left: '24px',
    bottom: '72px',
    alignItems: 'center',
    '@media (maxWidth:480px)': {
      bottom: '40px',
    },
  },
});

export const ProductDescriptionContainer = styled('div')({
  backgroundColor: '#f7eee8',
  '.desc-wrapper': {
    backgroundColor: '#fff',
    padding: '32px 24px',
    paddingBottom: '24px',
    borderBottomLeftRadius: '500px 43px',
    borderBottomRightRadius: '300px 43px',
    '@media (maxWidth:787px)': {
      borderBottomLeftRadius: '400px 43px',
      borderBottomRightRadius: '250px 43px',
    },
    '@media (maxWidth:480px)': {
      borderBottomLeftRadius: '300px 43px',
      borderBottomRightRadius: '150px 43px',
    },
  },
  '.vendor': {
    letterSpacing: '0.03em',
    color: 'var(--neutral-primary)',
    textTransform: 'uppercase',
  },
  '.title': {
    marginTop: '16px',
    marginBottom: '8px',
    color: 'var(--neutral-primary)',
  },
  '.chip-list': {
    '.MuiChip-root': {
      backgroundColor: 'var(--peony-50)',
      marginTop: '16px',
      marginRight: '8px',
    },
    '.MuiChip-label': {
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '5px 8px',
    },
  },
  '.price-list-wrapper': {
    width: '100%',
    float: 'left',
    '.price-list': {
      width: '25%',
      float: 'left',
      '@media (max-width: 650px)': {
        width: '50%',
      },
      '.price': {
        color: 'var(--neutral-primary)',
      },
      '.price-text': {
        color: 'var(--neutral-primary-light)',
      },
    },
    '@media (max-width:400px)': {
      display: 'inline-block',
    },
  },
  '.details-wrapper': {
    marginTop: '16px',
    '.details': { color: 'var(--neutral-primary)', paddingBottom: '8px' },
  },
});

export const ProductIngredientContainer = styled('div')({
  padding: '24px',
  paddingTop: '14px',
  color: 'var(--neutral-primary)',
  backgroundColor: 'var(--neutral-tertiary)',
  '.ingredients': {
    fontSize: '24px',
  },
  '.ingredients-list': {
    marginTop: '24px',
  },
  '.ingredients-details': {
    marginTop: '8px',
  },
});

export const ProductDetailWrapper = styled('div')({
  '.bottom-curve': {
    marginBottom: '-7px',
  },
});
