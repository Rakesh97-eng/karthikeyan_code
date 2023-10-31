import { styled } from '@mui/material';

export interface StyledDetailContainerProps {
  aside?: boolean;
}

export const StyledDetailContainer = styled('div')(
  (props: StyledDetailContainerProps) => ({
    backgroundColor: 'var(--neutral-secondary)',
    padding: `${props.aside ? '16px' : '0 24px 24px'}`,
    borderRadius: '8px',
    marginBottom: '24px',
    top: '10px',
    position: `${props.aside ? 'sticky' : 'static'}`,
    alignSelf: `${props.aside ? 'flex-start' : 'auto'}`,
    display: 'flex',
    flexDirection: 'column',
    gap: `${props.aside ? '0' : '24px'}`,
    '.header-wrapper': {
      borderBottom: '1px solid var(--neutral-secondary-dark)',
      position: `${props.aside ? 'static' : 'sticky'}`,
      paddingTop: `${props.aside ? '0' : '24px'}`,
      backgroundColor: 'var(--neutral-secondary)',
      top: '0',
      zIndex: '999',
      '.header': {
        backgroundColor: 'var(--neutral-secondary)',
        display: 'flex',
        gap: '8px',
        paddingBottom: '16px',
        zIndex: '999',
        alignItems: 'center',

        h2: {
          flexGrow: 1,
        },
        '.header-icon-button': {
          borderRadius: `${props.aside ? '4px' : '8px'}`,
          height: `${props.aside ? '32px' : '40px'}`,
          width: `${props.aside ? '32px' : '40px'}`,
          padding: `${props.aside ? '4px' : '8px'}`,
          border: '1.5px solid var(--neutral-secondary-darker)',
        },
      },
      '.sub-header-text': {
        color: 'var(--neutral-primary-light)',
        paddingBottom: '8px',
      },
    },
  })
);
