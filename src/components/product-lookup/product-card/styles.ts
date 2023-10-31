import styled from '@emotion/styled';

export const ProductLookupProductCardStyled = styled('div')({
  display: 'grid',
  gridTemplateColumns: '102px 1fr',
  gridGap: '16px',
  paddingBlock: '16px',
  borderBottom: '1px solid var(--neutral-secondary-dark)',
  // Image Styles
  '.product-card-image': {
    width: '100%',
    overflow: 'hidden',
    borderRadius: '4px',
    position: 'relative',
    aspectRatio: '12/16',

    img: {
      aspectRatio: '12/16',
      width: '100%',
      objectFit: 'cover',
    },

    '.product-image-chip': {
      position: 'absolute',
      left: '8px',
      top: '8px',
      zIndex: 1,
    },
    '.back-or-front-bar-icons': {
      position: 'absolute',
      left: '8px',
      bottom: '8px',
      zIndex: 1,
      backgroundColor: 'var(--neutral-secondary)',
      height: '20px',
      width: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',

      '& > svg': {
        width: '10px',
      },
    },
  },
  '.product-details': {
    '.product-brand': {
      color: 'var(--neutral-primary-light)',
      textTransform: 'uppercase',
    },
    '.product-name': {
      marginTop: '8px',
    },
    '.product-effective-for': {
      fontStyle: 'italic',
      color: 'var(--neutral-primary-light)',
    },
  },
});
