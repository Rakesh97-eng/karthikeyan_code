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
    left: sideBarStatus ? '0' : '-100vw',
    right: 0,
    display: 'none',
    [`${theme?.breakpoints.down('lg')}`]: {
      display: 'block',
      zIndex: '12',
    },
  })
);
export const SideBarMenuContainer = styled('div')(() => ({
  minWidth: '343px',
  height: '100vh',
  backgroundColor: 'var(--neutral-secondary)',
}));
export const SideBarMenuHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  position: 'sticky',
  top: 0,
  backgroundColor: 'var(--neutral-secondary)',
});
export const SideBarMenuItems = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  marginBottom: '40px',
});
export const SideBarMenuItem = styled('div')({
  display: 'flex',
  padding: '25px 0 25px 28px',
  borderTop: '1px solid var(--neutral-secondary-dark)',
  '&:nth-last-of-type(1)': {
    borderBottom: '1px solid var(--neutral-secondary-dark)',
  },
  img: { marginRight: '20px' },
});
export const HeaderImg = styled('img')({
  height: '32px',
});
export const SideBarQuickLinksWrapper = styled('div')({
  paddingLeft: '24px',
  '.quickLinkText': {
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
});
export const QuickLinkList = styled('ul')({
  padding: 0,
  margin: 0,
});
export const QuickLinkListItem = styled('li')({
  display: 'flex',
  padding: '12px 0',
  '.quickLink-icon': {
    marginRight: '10px',
  },
});
export const QuickLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
