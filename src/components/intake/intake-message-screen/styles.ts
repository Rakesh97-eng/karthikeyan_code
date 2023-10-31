import { styled } from '@mui/system';

export const IntakeSectionContainer = styled('div')({
  '.bottom-curve': {
    position: 'absolute',
    left: 0,
    width: '100%',
    marginTop: '-1px',
    zIndex: '1',
  },
  '.bottom-img': {
    position: 'absolute',
    left: 0,
    width: '100%',
    marginTop: '-16px',
    zIndex: '1',
    '@media (max-width: 1025px)': {
      marginTop: '-13px',
    },
    '@media (max-width: 769px)': {
      marginTop: '-8px',
    },
    '@media (max-width: 481px)': {
      display: 'none',
    },
  },
});

interface HeaderContainerProps {
  backgroundColor: string;
}
export const IntakeHeaderContainer = styled('div')(
  (props: HeaderContainerProps) => ({
    backgroundColor: props.backgroundColor,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '24px',
    '@media (max-width: 768px)': {
      paddingBottom: '32px',
    },
    '@media (max-width: 481px)': {
      minHeight: '100vh',
    },
    '.header-container': {
      margin: '56px 0px',
      '.title': {
        maxWidth: '384px',
        margin: '0 auto',
        marginTop: '8px',
      },
      '@media (max-width: 768px)': {
        marginTop: '48px',
      },
    },
    '.MuiLink-root': {
      margin: '0px',
      color: 'var(--neutral-primary)',
      textDecoration: 'none',
    },
  })
);
export const IntakeFooterContainer = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  display: 'flex',
  justifyContent: 'center',

  '.empty-footer': {
    minHeight: '400px',
  },
  '@media (max-width: 481px)': {
    '.empty-footer': {
      display: 'none',
    },
  },
});

export const MessageCardWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  maxWidth: '588px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  '.title': {
    marginTop: '4px',
  },
  '.card-content': {
    padding: '24px',
    paddingRight: '16px',
  },
  '.svg-icon': {
    borderRadius: '8px',
    height: '100%',
    maxWidth: '100px',
  },
});

export const MessageCardContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
  '@media (max-width: 768px)': {
    margin: '16px 24px',
  },
});
export const FooterCardContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  margin: '70px 24px',
  '@media (max-width: 768px)': {
    margin: '46px 24px',
  },
});
export const FooterCardWrapper = styled('div')({
  backgroundColor: 'var(--sky-20)',
  borderRadius: '8px',
  maxWidth: '588px',
  display: 'flex',
  alignItems: 'center',
  '.content-wrapper': {
    padding: '24px',
    paddingRight: '0px',
  },
  '.icon-btn': {
    padding: '12px 16px',
    backgroundColor: 'var(--accent-primary)',
    textTransform: 'none',
  },
  '.MuiButtonBase-root:hover': {
    backgroundColor: 'var(--accent-primary)',
  },
  '.footer-text': {
    marginTop: '8px',
    marginBottom: '16px',
  },
  '.svg-md-container': {
    display: 'none',
    '@media (min-width:480px)': {
      display: 'block',
      height: '100%',
    },
  },
  '.svg-sm-container': {
    '@media (min-width:480px)': {
      display: 'none',
      height: '100%',
    },
  },
  '.svg-icon': {
    borderRadius: '8px',
    height: '100%',
    width: 'auto',
  },
});
