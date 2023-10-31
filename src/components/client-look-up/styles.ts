import { styled, Paper } from '@mui/material';

export const ClientLookUpWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: '24px',
  '.header-text': {
    marginLeft: '16px',
    color: 'var(--neutral-primary)',
  },
});
export const StyledPaper = styled(Paper)({
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '8px',
  boxShadow: 'none',
  margin: '24px 0px',
  border: '1.5px solid var(--neutral-secondary-darker)',
  '& .MuiInputBase-input': {
    color: 'var(--neutral-primary-light)',
  },
});

export const ClientListWrapper = styled('div')({
  '.page': {
    padding: '8px 24px 24px 24px',
  },
  '.MuiTableCell-root': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
    color: 'var(--neutral-primary-light)',
    padding: '16px 0',
  },
  '.MuiPaper-root': {
    borderRadius: '8px',
  },
  '.textContainer': {
    '@media (max-width: 500px)': {
      display: 'block',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  '.duplicate-label': {
    borderRadius: '20px',
    backgroundColor: 'var(--slate-100)',
    color: '#fff',
    fontSize: '12px',
    height: '24px',
    width: '84px',
    textAlign: 'center',
  },
  '.warning-text': {
    display: 'flex',
    alignItems: 'center',
    '.warning-icon': {
      marginLeft: '10px',
    },
  },
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
        '&:first-child': {
          marginRight: '12px',
        },
      },
    },
  },
});

export const ClientLookUpContainer = styled('div')({
  display: 'flex',
  '.MuiGrid-root': {
    flexDirection: 'column',
  },
  '& .close-filled-icon': {
    margin: '12px',
  },
});
