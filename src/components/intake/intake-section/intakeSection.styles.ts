import { styled } from '@mui/system';

interface IntakeSectionProps {
  BottomCurve: string;
}
export const IntakeSectionContainer = styled('div')(
  (props: IntakeSectionProps) => ({
    '.bottom-curve': {
      position: 'absolute',
      left: 0,
      width: '100%',
      marginTop: '-1px',
      zIndex: '1',

      '@media (max-width: 768px)': {
        marginTop: '0px',
      },
      '@media (max-width: 425px)': {
        marginTop: '-1px',
        content: `url(${props.BottomCurve})`,
      },
    },
  })
);

export interface IntakeHeader {
  backgroundColor: string;
}

export const IntakeSectionHeaderContainer = styled('div')(
  (props: IntakeHeader) => ({
    backgroundColor: props.backgroundColor,
    display: 'flex',
    justifyContent: 'center',
    '.header-wrapper': {
      maxWidth: '588px',
      margin: '40px 24px 30px 24px ',
      '.section': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',

        div: {
          width: '48%',
        },
        '.section-number': {
          color: 'var(--neutral-primary)',
          letterSpacing: '0.03em',
        },
      },
      '.header-container': {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '588px',
        marginTop: '28px',
        flexDirection: 'column',
        '.title': {
          maxWidth: '384px',
          margin: 'auto',
          marginTop: '8px',
        },
      },
    },
  })
);

export const IntakeSectionBodyContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'var(--neutral-tertiary)',
  position: 'relative',
  padding: '24px',
  paddingBottom: '96px',
  '.intake-container': {
    width: '100%',
    maxWidth: '588px',
  },
  '@media (max-width: 425px) ': {
    padding: '24px',
  },
  '.intake-content-wrapper': {
    marginTop: '56px',
    '.header': {
      display: 'flex',
      alignItems: 'start',
      padding: '0px',
      gap: '12px',
      color: 'var(--neutral-primary)',
    },
    '.icon': {
      marginTop: '4px',
    },
    '.question-section': {
      '.section-label': {
        marginTop: '8px',
        color: 'var(--neutral-primary-light)',
      },
      '.list-items': {
        marginTop: '8px',
        marginLeft: '12px',
      },
    },
  },
  '.button-wrapper': {
    marginTop: '56px',
    '.MuiTypography-root': { fontWeight: '700' },
  },
});
