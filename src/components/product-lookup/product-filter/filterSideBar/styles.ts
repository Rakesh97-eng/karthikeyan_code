import { Theme } from '@mui/material';
import styled from '@emotion/styled';

export const SideBarBackDrop = styled('div')(
  ({ sideBarStatus, theme }: { sideBarStatus: boolean; theme?: Theme }) => ({
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    background: 'var(--neutral-primary)',
    opacity: '0.4',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: sideBarStatus ? '0' : '-100vw',
    transition: '0.8s',
    display: 'none',
    [`${theme?.breakpoints.down('sm')}`]: {
      display: sideBarStatus ? 'block' : 'none',
      zIndex: '12',
      overflowX: 'hidden',
    },
  })
);
export const SideBarMenuContainer = styled('div')(
  ({ sideBarStatus, theme }: { sideBarStatus: boolean; theme?: Theme }) => ({
    minWidth: '343px',
    height: '100vh',
    overflowX: 'hidden',
    backgroundColor: 'var(--neutral-secondary)',
    position: 'absolute',
    top: 0,
    right: sideBarStatus ? '0' : '-353px',
    zIndex: 2,
    transition: '0.5s',
    display: 'none',
    [`${theme?.breakpoints.down('sm')}`]: {
      display: sideBarStatus ? 'block' : 'none',
      zIndex: '12',
      overflowX: 'hidden',
    },
    '@media(max-width:320px)': {
      minWidth: '313px',
    },
  })
);
export const SideBarMenuHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.04)',
  '.header-text': { margin: 'auto' },
});
export const SideBarMenuItems = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '40px',
  padding: '18px',
  paddingTop: '10px',
});
