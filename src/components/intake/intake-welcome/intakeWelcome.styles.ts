import { styled } from '@mui/system';

export const WelcomeContainer = styled('div')({
  backgroundColor: 'var(--neutral-tertiary)',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  overflowX: 'hidden',
  height: '100%',
  width: '100%',
});

export const AfterWelcomeWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
  position: 'fixed',
  '.success-container': {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    animation: '300ms ease-out success-banner',
    animationDelay: '200ms',

    '.success-wrapper': {
      maxWidth: '588px',
      '.img-container': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
  '@keyframes success-banner': {
    '0%': {
      transform: 'translateY(100%)',
    },
    '100%': {
      transform: 'translateY(0%)',
    },
  },
  '.success-container-down': {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    animation: '300ms ease-out success-banner-down',
    animationDelay: '200ms',

    '.success-wrapper': {
      maxWidth: '588px',
      '.img-container': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
  '@keyframes success-banner-down': {
    '0%': {
      transform: 'translateY(0%)',
    },
    '100%': {
      transform: 'translateY(100%)',
      visibility: 'hidden',
    },
  },
  '.header': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '8px',
    paddingTop: '24px',
    maxWidth: '588px',
  },
  '.title': {
    textAlign: 'center',
    color: 'var(--neutral-primary)',
    paddingBottom: '40px',
    maxWidth: '384px',
  },
});

export const WelcomeWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '588px',
  '.success-container': {
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'hidden',
    '.success-wrapper': {
      maxWidth: '588px',

      '.video-wrapper': {
        display: 'grid',
        justifyContent: 'center',
        paddingTop: '40px',
        '.video-player': {
          borderRadius: '8px',
        },
      },
      '.img-container': {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '48px',
      },
      '.svg-icon': {
        zIndex: '10',
        marginTop: '-18px',
        width: '100%',
        bottom: 0,
      },
      '@media (min-width:880px)': {
        '.img-container': {
          marginTop: '56px',
        },
        '.svg-icon': {
          display: 'none',
        },
      },
      '@media (max-width:501px)': {
        '.video-wrapper': {
          paddingTop: '0px',
        },
      },
    },
    '.body-container': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '.input-button': {
        maxWidth: '201px',
      },
    },
  },
  '.content': {
    padding: '32px 0px',
    '.header': {
      textAlign: 'center',
      color: 'var(--neutral-primary)',
      paddingBottom: '8px',
      maxWidth: '384px',
    },
    '.title': {
      textAlign: 'center',
      color: 'var(--neutral-primary)',
      maxWidth: '384px',
    },
  },
});
