import styled from '@emotion/styled';

export const ProductLookupPageHeader = styled('div')({
  display: 'flex',
  marginBlock: '24px',
  marginTop: '8px',
  gap: '16px',
});
export const ProductLookupWrapper = styled('div')({
  '.search-box-wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
  '.filter-btn': {
    backgroundColor: 'var(--accent-primary)',
    borderRadius: '8px',
    padding: '12px 16px',
    marginLeft: '8px',
  },
});

export const ProductLookupPageSearch = styled('div')({
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '8px',
  boxShadow: 'none',
  margin: '24px 0px',
  backgroundColor: 'var(--neutral-secondary)',
  border: '1.5px solid var(--neutral-secondary-darker)',
  '& .MuiInputBase-input': {
    color: 'var(--neutral-primary-light)',
    textOverflow: 'ellipsis',
  },
  '.close-filled-icon': {
    marginRight: '8px',
  },
});

export const ProductLookupProductsContainer = styled('section')({
  backgroundColor: 'var(--neutral-secondary)',
  padding: '24px',
  borderRadius: '8px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  // Pagination Option Styles
  '.MuiTablePagination-toolbar': {
    marginTop: '24px',
    height: '40px',
    minHeight: '40px',
    '.MuiTablePagination-displayedRows': {
      fontSize: '16px',
      color: 'var(--neutral-primary)',
    },
    '.MuiTablePagination-actions': {
      marginLeft: '12px',
      '.MuiIconButton-root': {
        border: '1.5px solid var(--neutral-secondary-darker)',
        borderRadius: '4px',
        padding: '6px',
        '&:first-of-type': {
          marginRight: '12px',
        },
      },
    },
  },
});

export const ProductLookupProductCard = styled('div')({
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
      objectFit: 'fill',
    },

    '.product-image-chip': {
      position: 'absolute',
      left: '8px',
      top: '8px',
      zIndex: 1,
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
