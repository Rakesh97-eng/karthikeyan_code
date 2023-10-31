import { styled, Paper, Link } from '@mui/material';

export const StyledPaper = styled(Paper)({
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '8px',
  boxShadow: 'none',
  margin: '24px 0px',
  border: '1.5px solid var(--neutral-secondary-darker)',
});

export const ClientCardListWrapper = styled('div')({
  '.MuiTableCell-root': {
    borderBottom: '1px solid var(--neutral-secondary-darker)',
    color: 'var(--neutral-primary-light)',
    padding: '16px 24px',
  },
  '.MuiTableContainer-root': {
    maxHeight: 'fit-content',
  },
  '.MuiPaper-root': {
    borderRadius: '8px',
  },
  '.button': {
    width: '10%',
    '.MuiButton-root': {
      marginBottom: '0px',
      border: '1.5px solid var(--accent-primary)',
      padding: '4px 12px',
      borderRadius: '4px',
      height: '40px',
      '.MuiTypography-root': {
        fontWeight: '700',
      },
    },
  },
  '.MuiTablePagination-root:last-child': {
    padding: '16px 24px 24px',
  },
  '.MuiTablePagination-root': {
    color: 'var(--neutral-primary)',
  },
  '.MuiTablePagination-displayedRows': {
    fontSize: '16px',
    lineHeight: '24px',
  },
});

export const ClientLookUpContainer = styled('div')({
  display: 'flex',
  '.MuiGrid-root': {
    flexDirection: 'column',
  },
});

export const HeaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  paddingBottom: '0px',
  '.icon': {
    marginRight: '12px',
  },
  '.inner-wrapper': {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export const ResourceWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  marginTop: '24px',
  padding: '24px',
  '.header': {
    display: 'flex',
    alignItems: 'center',
    '.header-icon': {
      marginRight: '12px',
    },
  },
  '.secondary-text': {
    marginTop: '8px',
    marginBottom: '16px',
  },
  '.link-text': {
    color: 'var(--neutral-primary)',
    textDecoration: 'none',
  },
});

export const StyledResourceCard = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  border: '1.5px solid var(--neutral-secondary-darker)',
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  padding: '16px',
  gap: '11px',
  cursor: 'pointer',
  '.text': {
    flexGrow: '1',
  },
  '.link-text': {
    fontWeight: '700',
  },
});
export const BodyWrapper = styled('div')({
  '.MuiPaper-root': {
    boxShadow: 'none',
    borderRadius: '8px',
  },
  '.link-text': {
    fontWeight: '700',
  },
});

interface IPopUpHeader {
  backgroundColor: string;
}

export const PopUpHeaderWrapper = styled('div')(
  ({ backgroundColor }: IPopUpHeader) => ({
    backgroundColor: backgroundColor,
    padding: '32px 0px 16px 24px',
    '.date-close-wrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '.time': {
        letterSpacing: '0.03em',
      },
      '.close-icon': {
        marginRight: '16px',
        marginTop: '-8px',
      },
    },

    '.client-name-wrapper': {
      display: 'flex',
      alignItems: 'baseline',
      marginTop: '8px',
      '.first-img': {
        marginLeft: '16px',
      },
      img: {
        marginRight: '8px',
      },
    },
  })
);
export const PopUpBodyWrapper = styled('div')({
  padding: '24px',
  '.content': {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '24px',
    gap: '8px',
  },
  '.MuiButton-root': {
    margin: '0',
  },
  '.btn-style': {
    '.MuiTypography-root': {
      fontWeight: '700',
    },
  },
});

export const EmptyPopUp = styled('div')({
  padding: '24px',
  paddingTop: '0px',
  display: 'flex',
  flexDirection: 'column',
});
